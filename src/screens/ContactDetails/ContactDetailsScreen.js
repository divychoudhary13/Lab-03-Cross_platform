import React, { useMemo } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Linking, 
  Alert, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useContacts } from '../../utils/ContactContext';
import { formatContactName } from '../../data/contactsData';
import { Colors, Fonts, Spacing, GlobalStyles } from '../../styles/globalStyles';

const ContactDetailsScreen = ({ route, navigation }) => {
   //Extract conatct ID passed from the previous screen
  const { contactId } = route.params;
  const { contacts, toggleFavorite, deleteContact } = useContacts();

  // Find the contact from context
  const contact = useMemo(() => contacts.find(c => c.id === contactId), [contacts, contactId]);

  // If no matching contact found, show a fallback screen
  if (!contact) {
    return (
      <SafeAreaView style={[GlobalStyles.container, GlobalStyles.centered]}>
        <Text>Contact not found</Text>
      </SafeAreaView>
    );
  }

  const fullName = formatContactName(contact);

  // Handle call
  const handleCall = () => {
    const url = `tel:${contact.phone}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url);
      else Alert.alert('Error', 'Phone calls not supported on this device');
    });
  };

  // Handle message
  const handleMessage = () => {
    const url = `sms:${contact.phone}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url);
      else Alert.alert('Error', 'SMS not supported on this device');
    });
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          {contact.avatar ? (
            <Image source={{ uri: contact.avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarText}>
                {contact.firstName[0]}
                {contact.lastName[0]}
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(contact.id)}
            accessible = {true}
            accessibilityRole = "button"
            accessibilityLabel = {contact.favorite ? "Remove from favorites" : "Mark as favorite"}
          >
            <Icon
              name={contact.favorite ? 'star' : 'star-border'}
              size={28}
              color={contact.favorite ? Colors.secondary : Colors.text.secondary}
            />
          </TouchableOpacity>
        </View>

        {/* Info */}
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.company}>{contact.company || 'No company'}</Text>

        {/* Contact details */}
        <View style={styles.infoRow}>
          <Icon name="phone" size={20} color={Colors.primary} />
          <Text style={styles.infoText}>{contact.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="email" size={20} color={Colors.primary} />
          <Text style={styles.infoText}>{contact.email}</Text>
        </View>
        {contact.notes ? (
          <View style={styles.notesContainer}>
            <Text style={styles.notesTitle}>Notes</Text>
            <Text style={styles.notesText}>{contact.notes}</Text>
          </View>
        ) : null}

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} 
          onPress={handleCall}
          accessible = {true}
          accessibilityRole = "button"
          accessibilityLabel = {`Call ${fullName}`}
          >
            <Icon name="phone" size={22} color={Colors.text.light} />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} 
          onPress={handleMessage}
            accessible = {true}
            accessibilityRole = "button"
            accessibilityLabel = {`Send message to ${fullName}`}
            >
            <Icon name="message" size={22} color={Colors.text.light} />
            <Text style={styles.actionText}>Message</Text>
          </TouchableOpacity>

          <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: Colors.secondary }]}
                onPress={() => navigation.navigate('AddContact', { contact })}
                accessible = {true}
                accessibilityRole = "button"
                accessibilityLabel = {`Edit contact ${fullName}`}
                >
                <Icon name="edit" size={22} color={Colors.text.light} />
                <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: Colors.accent }]}
            onPress={() =>
              Alert.alert(
                'Delete Contact',
                'Are you sure you want to delete this contact?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', style: 'destructive', onPress: () => {
                      deleteContact(contact.id);
                      navigation.goBack();
                    }
                  },
                ]
              )
            }
             accessible = {true}
             accessibilityRole = "button"
             accessibilityLabel = {`Delete contact ${fullName}`}
          >
            <Icon name="delete" size={22} color={Colors.text.light} />
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    padding: Spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: Colors.text.light,
    fontSize: Fonts.large,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  name: {
    fontSize: Fonts.xlarge,
    fontWeight: 'bold',
    marginTop: Spacing.md,
    color: Colors.text.primary,
  },
  company: {
    fontSize: Fonts.medium,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  infoText: {
    marginLeft: Spacing.sm,
    fontSize: Fonts.medium,
    color: Colors.text.primary,
  },
  notesContainer: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    width: '100%',
  },
  notesTitle: {
    fontSize: Fonts.medium,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
    color: Colors.text.primary,
  },
  notesText: {
    fontSize: Fonts.small,
    color: Colors.text.secondary,
  },
  actions: {
    flexDirection: 'row',
    marginTop: Spacing.lg,
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: Spacing.sm,
    padding: Spacing.md,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  actionText: {
    color: Colors.text.light,
    fontSize: Fonts.small,
    marginTop: 4,
  },
});

export default ContactDetailsScreen;