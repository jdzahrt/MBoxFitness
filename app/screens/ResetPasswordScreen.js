import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import { AppForm, AppFormField, SubmitButton, ErrorMessage } from '../components/forms';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().label('Current Password'),
  password: Yup.string().required().min(4).label('New Password'),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .label('Confirm Password'),
});

function ResetPasswordScreen({ route, navigation }) {
  const [resetFailed, setResetFailed] = useState(false);
  const [error, setError] = useState(null);
  const { token } = route.params || {};
  const { user } = useAuth();
  
  // If user is logged in and no token, this is a password change
  const isLoggedIn = user && !token;

  const handleSubmit = async ({ currentPassword, password }) => {
    setError(null);
    
    if (isLoggedIn) {
      // Change password for logged-in users
      const result = await authApi.changePassword(currentPassword, password);
      
      if (!result.ok) {
        setError(result.data?.message || 'Failed to change password');
        return;
      }
      
      setError('Password changed successfully!');
      setTimeout(() => navigation.goBack(), 2000);
    } else {
      // Original reset password flow with token
      const result = await authApi.resetPassword(token, password);
      
      if (!result.ok) {
        setResetFailed(true);
        setError(result.data?.message || 'Reset failed');
        return;
      }
      
      navigation.navigate('Login');
    }
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{ 
          currentPassword: '', 
          password: '', 
          confirmPassword: '' 
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={error} visible={error} />
        
        {isLoggedIn && (
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="currentPassword"
            placeholder="Current Password"
            secureTextEntry
            textContentType="password"
          />
        )}
        
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="New Password"
          secureTextEntry
          textContentType="password"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="confirmPassword"
          placeholder="Confirm Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title={isLoggedIn ? "Change Password" : "Reset Password"} />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ResetPasswordScreen;