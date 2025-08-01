import { Container, Text, VStack, SimpleGrid, Box, Heading, HStack, Image, useColorModeValue, IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useProductStore } from '../store/product';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

// ProductCard component - MAKE SURE THIS IS INCLUDED
const ProductCard = ({ product }) => {
    const textColor = useColorModeValue('gray.600', 'whiteAlpha.200');
    const bg = useColorModeValue('white', 'gray.800');
    
    return (
        <Box 
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{ transform: "translateY(-5px)", shadow: 'xl' }}
            bg={bg}
        >
            <Image
                src={product.image} 
                alt={product.name} 
                h={48} 
                w={'full'} 
                objectFit={'cover'}
            />

            <Box p={4}>
                <Heading as={'h3'} size={'md'} mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={2}>
                    ${product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton 
                        icon={<EditIcon />} 
                        colorScheme='blue'
                        onClick={() => {}}
                    />
                    
                    <IconButton 
                        icon={<DeleteIcon />} 
                        colorScheme='red'
                        onClick={() => {}}
                    />
                </HStack> 
            </Box>
        </Box>
    );
};

const HomePage = () => {
  const { fetchProducts, products } = useProductStore(); 
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  console.log("Products", products);
  
  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={'text'}
          textAlign={'center'}
        >
          Current Products🚀
        </Text>

        {products.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            w={'full'}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        ) : (
          <Text fontSize={"xl"} textAlign={'center'} fontWeight={'semibold'} color={'gray.500'}>
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text as={'span'} color={'blue.500'} _hover={{textDecoration: 'underline'}}>
                Create a new product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;