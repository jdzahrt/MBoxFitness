import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import authApi from '../api/auth';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
});

function ForgotPasswordScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ email }) => {
    setLoading(true);
    
    try {
      const result = await authApi.forgotPassword(email);
      
      if (result.ok) {
        Alert.alert(
          'Reset Email Sent',
          'Check your email for password reset instructions.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        Alert.alert('Error', result.data?.message || 'Failed to send reset email');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{ email: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
          icon="email"
        />
        <SubmitButton title="Send Reset Email" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ForgotPasswordScreen;