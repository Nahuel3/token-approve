import {
    Box,
    Flex,
    HStack,
    IconButton,
    useDisclosure,
    useColorModeValue,
    Stack,
    Image,
    Heading,
  } from "@chakra-ui/react";
  import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
 
  import WalletData from "./wallet-data";
 
  
  const MainLayout = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <Flex minH="100vh" direction="column">
        <Box
          mx="auto"
          maxW={"7xl"}
          width="100%"
          bg={useColorModeValue("white", "gray.800")}
          px={4}
        >
          <Flex
            bg={useColorModeValue("white", "gray.800")}
            color={useColorModeValue("gray.600", "white")}
            minH={"60px"}
            py={{ base: 2 }}
            px={{ base: 4 }}
            borderBottom={1}
            borderStyle={"solid"}
            borderColor={useColorModeValue("gray.200", "gray.900")}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
              <Flex alignItems="center">
               
                <Heading size="md" color="purple" mt={0.2} ml={1}>
                  
                </Heading>
              </Flex>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                
              </HStack>
            </HStack>
            <WalletData />
          </Flex>
  
          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
               
              </Stack>
            </Box>
          ) : null}
        </Box>
        <Box mx="auto" flex={1} p={4} maxW={"7xl"} width="100%">
          {children}
        </Box>
        
      </Flex>
    );
  };
  
  export default MainLayout;