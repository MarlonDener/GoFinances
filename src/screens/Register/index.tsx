import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";

import { CategorySelect } from '../../screens/CategorySelect';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";

interface FormData {
  name: string;
  amount: number;
}

const schema = Yup.object().shape({
  name: Yup
  .string()
  .required('Nome é obrigatório'),
  amount: Yup
  .number()
  .typeError('Informe um valor númerico')
  .positive('O valor não pode ser negativo')
})

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
 
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionsTypeSelect(type: 'up' | 'down') {
     setTransactionType(type)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleRegister(form: Partial<FormData>) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category,
    }
    console.log(data)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <Container>
         <Header>
           <Title>Cadastro</Title>
         </Header>
         <Form>
           <Fields>
             <InputForm
               control={control}
               name="name"
               placeholder="Nome"
               autoCapitalize="sentences"
               autoCorrect={false}
               error={errors.name && errors.name.message}
             />  
              <InputForm
               control={control}
               name="amount"
               placeholder="Preço"
               keyboardType="numeric"
               error={errors.amount && errors.amount.message}
             />
             <TransactionsTypes>
               <TransactionTypeButton
                 type="up"
                 title="Income"
                 isActive={transactionType === 'up'} 
                 onPress={() => handleTransactionsTypeSelect('up')}
             />
               <TransactionTypeButton
                 type="down" 
                 title="Outcome"
                 isActive={transactionType === 'down'}  
                 onPress={() => handleTransactionsTypeSelect('down')}
             />
             </TransactionsTypes>
    
             <CategorySelectButton
                title={category.name}
                onPress={handleOpenSelectCategoryModal}
              />
           </Fields>  

           <Button title="Enviar" onPress={handleSubmit(handleRegister)}/>  
         </Form>
         <Modal visible={categoryModalOpen}>
           <CategorySelect 
             category={category}
             setCategory={setCategory}
             closeSelectCategory={handleCloseSelectCategoryModal}
           />  
         </Modal>
       </Container>
     </TouchableWithoutFeedback>
  )  
}