import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  Heading,
  Input,
  Stack,
  Checkbox,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorToaster from '../../utils/toaster/ErrorToaster';
import {updateCategory} from '../../redux/actions/category/Category'
const UpdateCategoryModal = ({data}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { loginData } = useSelector(state => state.Auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState();

  const updateCategoryHandler = () => {
    const payload = {
      user_id: loginData?.data?.user?._id,
      title: title,
      activeStatus: data?.activeStatus,
      category_id : data?._id
    };
    if (!title) {
      ErrorToaster(toast, 'Please enter category title');
    } else {
      dispatch(updateCategory(payload, toast));
      setTitle('')
      onClose()
    }
  };
  return (
    <>
      <Button colorScheme="facebook" size={'sm'} onClick={onOpen}>
        Update Category
      </Button>
      <Modal isCentered size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton fontSize={'1.5rem'} />
          </ModalHeader>
          <ModalBody>
            <Stack py="4" px={'2'}>
              <Heading
                pb={'6'}
                textAlign={'center'}
                fontSize={{ base: 'xl', md: '2xl' }}
              >
                Update Category
              </Heading>
              <Stack spacing={'4'} px={{ base: '2', md: '4' }} w={'100%'}>
                <Input
                  defaultValue={data?.title}
                  onChange={e => setTitle(e.target.value)}
                  size={'lg'}
                  _hover={{}}
                  _focusVisible={{}}
                  borderColor="black"
                  placeholder="Enter category name"
                  isRequired
                />
                <Stack pt={{ base: '4', md: '6' }} alignItems={'center'}>
                  <Button
                    rounded={'md'}
                    borderRadius={'lg'}
                    size={'md'}
                    colorScheme={'purple'}
                    onClick={() => updateCategoryHandler()}
                  >
                    {' '}
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateCategoryModal;
