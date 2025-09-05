import React, { useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ResponsiveText } from './index';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants';
import InternationalPhoneInput from 'react-native-international-phone-number';
import Constants from 'expo-constants';


interface QuoteModalProps {
  visible: boolean;
  onClose: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ visible, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  
  // Validation states
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Remove all non-digit characters and check length
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10;
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!phoneNumber.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(phoneNumber)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
             const postData = {
         operationName: 'ContactRequestForm',
         variables: {
           data: {
             Name: formData.name,
             Email: formData.email,
             Phone: phoneNumber,
             Message: formData.message,
           },
         },
                   query: `
            mutation ContactRequestForm($data: ContactRequestInput!) {
              createContactRequest(data: $data) {
                data {
                  id
                }
              }
            }
          `,
       };

       // API endpoint and headers from app.json
       const apiUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_STRAPI_URL || 'https://admin.sahilcnc.com/graphql';
       const apiSecret = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_SECRET || '';
       
       const response = await fetch(`${apiUrl}`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${apiSecret}`,
         },
         body: JSON.stringify(postData),
       });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'GraphQL error occurred');
      }

             console.log('Contact request submitted successfully:', result.data?.createContactRequest?.data);
       
       // Show success message
       Alert.alert(
         'Success!',
         'Your quote request has been submitted successfully. We will contact you soon!',
         [
           {
             text: 'OK',
             onPress: () => {
               // Reset form and close modal
               setFormData({ name: '', email: '', phone: '', message: '' });
               setPhoneNumber('');
               setSelectedCountry(null);
               setErrors({});
               onClose();
             }
           }
         ]
       );
      
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Show error message to user
      // You can implement a toast or alert here
      setErrors({ submit: 'Failed to submit quote request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Fullscreen Backdrop */}
      <SafeAreaView style={styles.modalOverlay}>
        {/* Modal Box */}
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <ResponsiveText size="titleMedium" color="textPrimary" weight="bold">
              Get Your Quote
            </ResponsiveText>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.gray[500]} />
            </TouchableOpacity>
          </View>

                     {/* Content */}
           <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
             {/* Form Fields */}
             <View style={styles.formContainer}>
               {/* Name Field */}
               <View style={styles.inputContainer}>
                 <TextInput
                   style={[styles.input, errors.name ? styles.inputError : null]}
                   placeholder="YOUR NAME"
                   placeholderTextColor={COLORS.gray[400]}
                   value={formData.name}
                   onChangeText={(text) => {
                     setFormData({ ...formData, name: text });
                     if (errors.name) setErrors({ ...errors, name: '' });
                   }}
                 />
                 <View style={[styles.inputUnderline, errors.name ? styles.inputUnderlineError : null]} />
                 {errors.name && (
                   <ResponsiveText size="caption" color="error" style={styles.errorText}>
                     {errors.name}
                   </ResponsiveText>
                 )}
               </View>

               {/* Email Field */}
               <View style={styles.inputContainer}>
                 <TextInput
                   style={[styles.input, errors.email ? styles.inputError : null]}
                   placeholder="EMAIL ADDRESS"
                   placeholderTextColor={COLORS.gray[400]}
                   value={formData.email}
                   onChangeText={(text) => {
                     setFormData({ ...formData, email: text });
                     if (errors.email) setErrors({ ...errors, email: '' });
                   }}
                   keyboardType="email-address"
                   autoCapitalize="none"
                 />
                 <View style={[styles.inputUnderline, errors.email ? styles.inputUnderlineError : null]} />
                 {errors.email && (
                   <ResponsiveText size="caption" color="error" style={styles.errorText}>
                     {errors.email}
                   </ResponsiveText>
                 )}
               </View>

                               {/* Phone Field */}
                <View style={styles.inputContainer}>
                  <InternationalPhoneInput
                    value={phoneNumber}
                    onChangePhoneNumber={(phone) => {
                      setPhoneNumber(phone);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    selectedCountry={selectedCountry}
                    onChangeSelectedCountry={(country) => setSelectedCountry(country)}
                    defaultCountry="IN"
                    placeholder="PHONE NUMBER"
                    phoneInputPlaceholderTextColor={COLORS.gray[400]}
                    phoneInputStyles={{
                      container: styles.phoneInputContainer,
                      input: [styles.phoneInputText, errors.phone ? styles.inputError : null],
                      flag: styles.phoneFlag,
                      callingCode: styles.phoneCallingCode,
                    }}
                    modalType="bottomSheet"
                    isFullScreen={false}
                  />
                  <View style={[styles.inputUnderline, errors.phone ? styles.inputUnderlineError : null]} />
                  {errors.phone && (
                    <ResponsiveText size="caption" color="error" style={styles.errorText}>
                      {errors.phone}
                    </ResponsiveText>
                  )}
                </View>

               {/* Message Field */}
               <View style={styles.inputContainer}>
                 <TextInput
                   style={[styles.messageInput, errors.message ? styles.inputError : null]}
                   placeholder="MESSAGE"
                   placeholderTextColor={COLORS.gray[400]}
                   value={formData.message}
                   onChangeText={(text) => {
                     setFormData({ ...formData, message: text });
                     if (errors.message) setErrors({ ...errors, message: '' });
                   }}
                   multiline
                   numberOfLines={4}
                   textAlignVertical="top"
                 />
                 <View style={[styles.inputUnderline, errors.message ? styles.inputUnderlineError : null]} />
                 {errors.message && (
                   <ResponsiveText size="caption" color="error" style={styles.errorText}>
                     {errors.message}
                   </ResponsiveText>
                 )}
               </View>

               {/* Submit Button */}
               <TouchableOpacity 
                 style={[styles.submitButton, isSubmitting ? styles.submitButtonDisabled : null]} 
                 onPress={handleSubmit}
                 disabled={isSubmitting}
               >
                 <ResponsiveText size="bodyMedium" color="textInverse" weight="bold">
                   {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                 </ResponsiveText>
               </TouchableOpacity>

               {/* General Error Display */}
               {errors.submit && (
                 <View style={styles.submitErrorContainer}>
                   <ResponsiveText size="caption" color="error" style={styles.submitErrorText}>
                     {errors.submit}
                   </ResponsiveText>
                 </View>
               )}
             </View>
           </ScrollView>
         </View>
       </SafeAreaView>
     </Modal>

     
   </>
 );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    width: '90%',
    maxHeight: '88%',
    ...SHADOWS.lg,
    // Platform-specific optimizations
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[100],
  },
  closeButton: {
    padding: SPACING.xs,
  },
  content: {
    padding: SPACING.lg,
  },
  formContainer: {
    gap: SPACING.lg,
  },
  inputContainer: {
    marginBottom: SPACING.md,
  },
  input: {
    fontSize: 16,
    color: COLORS.textPrimary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    // Platform-specific input styling
    ...Platform.select({
      ios: {
        paddingTop: SPACING.sm,
        paddingBottom: SPACING.sm,
      },
      android: {
        paddingVertical: SPACING.sm,
      },
    }),
  },

  messageInput: {
    fontSize: 16,
    color: COLORS.textPrimary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    minHeight: 100,
  },
  inputUnderline: {
    height: 1,
    backgroundColor: COLORS.gray[300],
    marginTop: SPACING.xs,
  },
  inputUnderlineError: {
    backgroundColor: COLORS.error || '#ff0000',
  },
  inputError: {
    borderColor: COLORS.error || '#ff0000',
  },
  errorText: {
    marginTop: SPACING.xs,
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: COLORS.textPrimary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.gray[400],
    opacity: 0.6,
  },
  submitErrorContainer: {
    marginTop: SPACING.sm,
    alignItems: 'center',
  },
  submitErrorText: {
    textAlign: 'center',
    color: COLORS.error || '#ff0000',
  },
  // Phone Input Styling
  phoneInputContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInputText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  phoneFlag: {
    marginRight: 8,
  },
  phoneCallingCode: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginRight: 8,
  },
});

export default QuoteModal;
