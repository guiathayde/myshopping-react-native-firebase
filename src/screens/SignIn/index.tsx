import React, { useCallback, useState } from 'react';
import { Alert, Platform } from 'react-native';
import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously();
    console.log(user);
  }

  const handleCreateUserAccount = useCallback(() => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert('Usuário criado com sucesso!'))
      .catch((error) => {
        console.log(error);

        if (error.code === 'auth/email-already-in-use') {
          Alert.alert(
            'E-mail não disponível',
            'Escolha outro e-mail para cadastar!'
          );
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('E-mail inválido!');
        }

        if (error.code === 'auth/weak-password') {
          Alert.alert('Senha fraca', 'A senha deve ter no mínimo 6 dígitos.');
        }
      });
  }, [email, password]);

  const handleSignInWithEmailAndPassword = useCallback(() => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);

        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) {
          Alert.alert('Usuário não encontrado.', 'E-mail e/ou senha inválida.');
        }
      });
  }, [email, password]);

  const handleForgotPassword = useCallback(() => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() =>
        Alert.alert(
          'Enviamos um link no seu e-mail para voce redefinir sua senha.'
        )
      )
      .catch((error) => console.log(error));
  }, [email]);

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCompleteType="email"
        autoCapitalize="none"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        autoCompleteType="password"
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText
          title="Criar minha conta"
          onPress={handleCreateUserAccount}
        />
      </Account>
    </Container>
  );
}
