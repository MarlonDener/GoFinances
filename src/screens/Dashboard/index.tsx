import React from "react";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import { 
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
} from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard(){
  const data: DataListProps[] = [
  {
    id: '1',
    type: 'positive',
    title: "Desenvolvimento de site",
    amount: "R$ 17.000,20",
    category: {
      name: 'Vendas',
      icon: 'dollar-sign',
    },
    date: "10/04/2020"
  },
  {
    id: '2',
    type: 'negative',
    title: "Pizzaria",
    amount: "R$ 1.000,20",
    category: {
      name: 'Alimentação',
      icon: 'shopping-cart',
    },
    date: "13/04/2020"
  },
  {
    id: '3',
    type: 'negative',
    title: "Aluguel do apartamento",
    amount: "R$ 900,00",
    category: {
      name: 'casa',
      icon: 'shopping-bag',
    },
    date: "16/04/2020"
  },
];
  
    return (
      <Container>
        <Header>
          <UserWrapper>
            <UserInfo>
               <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/70349830?v=4' }} />
               <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Marlon Dener</UserName>
               </User>    
            </UserInfo>
            <LogoutButton onPress={() => {}}>
              <Icon name="power" />  
            </LogoutButton>
           </UserWrapper>
        </Header>
        <HighlightCards>
          <HighlightCard
             type="up"
             title="Entradas"
             amount="R$ 17.400,00" 
             lastTransation="Última entrada dia 13 de abril"
          />
          <HighlightCard
             type="down"
             title="Saídas"
             amount="R$ 1.700,00" 
             lastTransation="Última saída dia 30 de abril"
          />
           <HighlightCard
             type="total"
             title="Total"
             amount="R$ 16.400, 00" 
             lastTransation="01 à 16 de abril"
          />
        
        
        </HighlightCards>

        <Transactions>
          <Title>Listagem</Title>  
          <TransactionList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <TransactionCard data={item} />}
          />
      
        </Transactions>

              
     </Container>
    )
}