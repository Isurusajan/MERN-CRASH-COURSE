import { Container, Flex, Text, HStack ,useColorMode} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaStore } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
const Navbar = () => {
    const{ colorMode,toggleColorMode } = useColorMode();
    
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDir={{base: 'column', sm: 'row'}}
      >
        <HStack spacing={2}>
          <Text
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            textAlign='center'
            textTransform='uppercase'
            bgClip='text'
            fontSize={{base:"22", sm:"28"}}
            fontWeight='extrabold'
          >
            <Link to={"/"}> Product Store </Link>
          </Text>
          <FaStore size={24} color="#7928CA" />
        </HStack>

        <HStack spacing={6} alignItems={'center'}>
            <Link to={"/create"}>
            <button>
                <FaPlusSquare fontSize={30}/>
            </button>
            </Link>
            <button onClick={toggleColorMode}>
                {colorMode === 'light' ?  <IoMoon fontSize={30}/>:<LuSun size={30} />}
            </button>
     </HStack>
      </Flex>
    </Container>
  );
};   

export default Navbar;