import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, StyleSheet, Linking } from 'react-native';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useNavigation, RouteProp  } from '@react-navigation/native';
import { RootStackParamList } from '../Types/navigationTypes';
import { colors } from '../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import EventHistory from '../components/EventHistory/EventHistory';
import Followers from '../components/Followers/Followers';

// Assuming you have an AuthContext set up for React Native as well
// import { useAuth } from '@/context/AuthContext';
// Notification and upload handling would need to be adapted for React Native
// Import your followers and event history components adapted for React Native
type UserProfileRouteProp = RouteProp<RootStackParamList, 'UserProfile'>;
type Props = {
    route: UserProfileRouteProp;
  };

const UserProfile: React.FC<Props> = ({ route}) => {
    const { userID } = route.params;
    const GET_USERS_EVENTS_FOLLOWINGS = gql`
    query  {
      userById(userId: ${userID}) {
              id,
              firstname,
              lastname,
              localization,
              description,
              facebook,
              instagram,
              tiktok,
              youtube,
              avatarImage,
              bannerImage,
              following{
                  id,
                  firstname,
                  lastname,
                  avatarImage,
                  localization,
              }
              followers{
                id,
                firstname,
                lastname,
                avatarImage,
                localization,
              }
              events {
                id,
                name,
                date,
                localization,
              }
        }
        futureEvents(userId: ${userID}) {
          id,
          name,
          date,
          localization,
          bannerImage,
          organizer {
            id,
            avatarImage
          }
        }
        pastEvents(userId: ${userID}) {
          id,
          name,
          date,
          localization,
          bannerImage,
          organizer {
            id,
            avatarImage
          }
        }
    }
  `;
  const UPDATE_USER_MUTATION = gql`
    mutation UpdateUser($updateUserArgs: UpdateUserArgs!) {
      updateUser(updateUserArgs: $updateUserArgs) 
    }
  `;
  const FOLLOW_USER_MUTATION = gql`
    mutation FollowUser($userId: Int!, $followingId: Int!) {
      follow(followInput: { userId: $userId, followingId: $followingId })
    }
    `;
    const UN_FOLLOW_USER_MUTATION = gql`
    mutation UnFollowUser($userId: Int!, $followingId: Int!){
      unfollow(followInput: { userId: $userId, followingId: $followingId })
    }
    `;
  const navigation = useNavigation();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
//   const {currentUser} = useAuth();
  const [state, setState] = useState({
    editedFirstName: '',
    editedLastName: '',
    editedDescription: '',
    editedFacebook: '',
    editedInstagram: '',
    editedTiktok: '',
    editedYoutube: '',
    editedLocalization: ''
  });
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [followUser] = useMutation(FOLLOW_USER_MUTATION);
  const [unFollowUser] = useMutation(UN_FOLLOW_USER_MUTATION);
  const { loading, error, data, refetch } = useQuery(GET_USERS_EVENTS_FOLLOWINGS);
  const [isCurrentlyFollowing, setIsCurrentlyFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

//   useEffect(() => {
//     if (data && data.userById) {
//       setFollowersCount(data.userById.followers.length || 0);
//       const isFollowing = data.userById.followers.some((follower: any) => follower.id === currentUser?.id);
//       setIsCurrentlyFollowing(isFollowing);
//     }
//   }, [data, currentUser?.id]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const user = data.userById;
  const futureEvents = data.futureEvents;
  const pastEvents = data.pastEvents;
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };
  const handleBackgroundSelect = (file: File) => {
    setSelectedBackground(file);
  };
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setState({
      ...state,
      editedFirstName: user.firstname,
      editedLastName: user.lastname,
      editedDescription: user.description,
      editedFacebook: user.facebook,
      editedInstagram: user.instagram,
      editedTiktok: user.tiktok,
      editedYoutube: user.youtube,
      editedLocalization: user.localization
    });
  };

  const handleSave = async () => {
    try {
    const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;

    let newAvatarUrl: string | undefined, newBannerUrl: string | undefined;

    const uploadToCloudinary = async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', "EventSpot");

      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    };

    if (selectedFile) {
      const uploadResult = await uploadToCloudinary(selectedFile);
      newAvatarUrl = uploadResult.secure_url;
    }

    if (selectedBackground) {
      const backgroundResult = await uploadToCloudinary(selectedBackground);
      newBannerUrl = backgroundResult.secure_url;
    }

      const response = await updateUser({
        variables: {
          updateUserArgs: {
            // id: parseInt(userID, 10),
            id: userID,
            firstname: state.editedFirstName,
            lastname: state.editedLastName,
            description: state.editedDescription,
            facebook: state.editedFacebook,
            instagram: state.editedInstagram,
            tiktok: state.editedTiktok,
            youtube: state.editedYoutube,
            avatarImage: newAvatarUrl, 
            bannerImage: newBannerUrl,
            localization: state.editedLocalization
          }
        }
      });

      setIsEditing(false);
      await refetch();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

//   const handleFollow = async () => {
//     if (!currentUser) {
//       Notifications.show({ title: 'Zaloguj się', message: 'Musisz być zalogowany, aby obserwować użytkownika.', color: 'red' });
//       return;
//     }
//     try {
//       if (isCurrentlyFollowing) {
//         await unFollowUser({
//           variables: {
//             userId: currentUser.id,
//             followingId: parseInt(userID, 10),
//           }
//         });
//         Notifications.show({ title: 'Sukces', message: 'Przestałeś obserwować użytkownika.', color: 'green' });
//       } else {
//         await followUser({
//           variables: {
//             userId: currentUser.id,
//             followingId: parseInt(userID, 10),
//           },
//         });
//         Notifications.show({ title: 'Sukces', message: 'Zacząłeś obserwować użytkownika.', color: 'green' });
//       }
//       setIsCurrentlyFollowing(!isCurrentlyFollowing);
//       refetch(); 
//     } catch (error) {
//       console.error('Error updating follow status:', error);
//       Notifications.show({ title: 'Błąd', message: 'Nie udało się zaktualizować statusu obserwacji.', color: 'red' });
//     }
//   };
    const handleIconPress = (url:string) => {
        if (url) {
            Linking.openURL(url);
          }
    };

  return (
    <ScrollView style={styles.main}>
      <View style={styles.up}>
        {isEditing ? (
            // <UploadForm onFileSelect={handleBackgroundSelect} />
            <Text>Upload Image</Text>
        ) : (
            <View>
            <Image
                style={styles.profileBanner} 
                source={user.bannerImage ? { uri: user.bannerImage } : require('../assets/images/profile_background.png')}
                alt={'Profile Banner'}
            />
            <View style={styles.overlay}></View>
            </View>
        )}
      </View>
      <View style={styles.profileDiv}>
        <View style={styles.profileLeft}>
            <View style={styles.profileSquare}>
            {isEditing ? (
                <>
                {/* <UploadForm onFileSelect={handleFileSelect} /> */}
                <Text>Upload Image</Text>
                </>
            ) : (
                <Image 
                // style={styles.avatar} 
                source={user.avatarImage ? { uri: user.avatarImage } : require('../assets/images/question.png')} 
                alt="Person Avatar" 
                width={100} 
                height={100} 
                />
            )}
            </View>
            <View style={styles.profileName}>
                {isEditing ? (
                    <>
                    <View> 
                        <TextInput 
                        placeholder="Imię"
                        selectionColor={colors.secondary}
                        underlineColorAndroid={colors.secondary}
                        value={state.editedFirstName} 
                        onChangeText={text => setState({ ...state, editedFirstName: text })}
                        style={styles.input}
                        />
                        <TextInput 
                        placeholder="Nazwisko"
                        selectionColor={colors.secondary}
                        underlineColorAndroid={colors.secondary}
                        value={state.editedLastName} 
                        onChangeText={text => setState({ ...state, editedLastName: text })}
                        style={styles.input}
                        />
                    </View>
                    <View> 
                        <TextInput 
                        placeholder="Lokalizacja"
                        selectionColor={colors.secondary}
                        underlineColorAndroid={colors.secondary}
                        value={state.editedLocalization} 
                        onChangeText={text => setState({ ...state, editedLocalization: text })}
                        style={styles.input}
                        />
                    </View>
                    </>
                ) : (
                    <>
                    <View> 
                        <Text style={styles.names}>{user.firstname} {user.lastname}</Text>
                    </View>
                    <Text>{user.localization}</Text>
                    </>
                )}
                </View>
                <Text style={styles.followers}>Obserwujących: {followersCount}</Text>
            </View>
            <View style={styles.divButton}>

             {
            //  currentUser?.id
             user.id === user.id ? ( 
            isEditing ? (
                <>
                <View style={styles.buttonView}>
                <TouchableOpacity style={styles.button} onPress={handleSave}><Text style={styles.buttonText}>Zapisz zmiany</Text></TouchableOpacity>
                <TouchableOpacity style={styles.buttonCancel} onPress={cancelEdit}><Text style={styles.buttonText}>Anuluj</Text></TouchableOpacity>
                </View>
                </>
            ) : (
                <TouchableOpacity style={styles.button} onPress={toggleEditMode}><Text style={styles.buttonText}>Edytuj Profil</Text></TouchableOpacity>
            )
            ) : 
            (
            isCurrentlyFollowing  ? (
                <TouchableOpacity style={styles.buttonCancel} 
                // onClick={handleFollow}
                >
                    <Text>Przestań obserwować</Text>
                    </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.button} 
                // onClick={handleFollow}
                >
                    <Text style={styles.buttonText}>Obserwuj</Text>
                    </TouchableOpacity>
            )
            )
            }
            </View>
      </View>
      <View style={styles.next}>
        <View style={styles.profileInfo}>
            <Text>O mnie</Text>
            <ScrollView style={styles.description}>
                {isEditing ? (
                <TextInput
                    style={styles.aboutTextArea}
                    placeholder='Opis, o mnie'
                    selectionColor={colors.secondary}
                    value={state.editedDescription}
                    onChangeText={(text) => setState({ ...state, editedDescription: text })}
                    multiline
                />
                ) : (
                <Text>{user.description}</Text>
                )}
            </ScrollView >
            <View style={styles.contact}>
                {isEditing ? (
                    <View style={styles.socialInputContainer}>
                        <View style={styles.socialInput}>
                            <Icon name="logo-facebook" size={40} color="#4968ad" />
                            <TextInput
                            style={styles.input}
                            placeholder="Link do profilu Facebook"
                            selectionColor={colors.secondary}
                            underlineColorAndroid={colors.secondary}
                            value={state.editedFacebook}
                            onChangeText={(text) => setState({ ...state, editedFacebook: text })}
                            />
                        </View>
                        <View style={styles.socialInput}>
                            <Icon name="logo-instagram" size={40} color="#e1306c" />
                            <TextInput
                            style={styles.input}
                            placeholder="Link do profilu Instagram"
                            selectionColor={colors.secondary}
                            underlineColorAndroid={colors.secondary}
                            value={state.editedInstagram}
                            onChangeText={(text) => setState({ ...state, editedInstagram: text })}
                            />
                        </View>
                        <View style={styles.socialInput}>
                            <Icon name="logo-tiktok" size={40} color="rgb(30, 48, 80)" />
                            <TextInput
                            style={styles.input}
                            placeholder="Link do profilu TikTok"
                            selectionColor={colors.secondary}
                            underlineColorAndroid={colors.secondary}
                            value={state.editedTiktok}
                            onChangeText={(text) => setState({ ...state, editedTiktok: text })}
                            />
                        </View>
                        <View style={styles.socialInput}>
                            <Icon name="logo-youtube" size={40} color="#eb3223" />
                            <TextInput
                            style={styles.input}
                            placeholder="Link do profilu YouTube"
                            selectionColor={colors.secondary}
                            underlineColorAndroid={colors.secondary}
                            value={state.editedYoutube}
                            onChangeText={(text) => setState({ ...state, editedYoutube: text })}
                            />
                        </View>
                    </View>
                ) : (
                    <View style= {styles.socialIcons}>
                    <TouchableOpacity onPress={() => handleIconPress(user.facebook)}>
                        <Icon name="logo-facebook" size={40} color="#4968ad" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleIconPress(user.instagram)}>
                        <Icon name="logo-instagram" size={40} color="#e1306c" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleIconPress(user.tiktok)}>
                        <Icon name="logo-tiktok" size={40} color="rgb(30, 48, 80)" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleIconPress(user.youtube)}>
                        <Icon name="logo-youtube" size={40} color="#eb3223" />
                    </TouchableOpacity>
                    </View>
                )}
            </View>
            <EventHistory
            futureEvents={futureEvents}
            pastEvents={pastEvents}
            />

            <Followers
            following={user.following}
            followers={user.followers}
            />
        </View>
      </View>
    </ScrollView>
  );
};

// Adapt your CSS to React Native StyleSheet
const styles = StyleSheet.create({
  next: {
    // Styling for additional profile sections
  },
  main: {
    flex: 1,
    padding: 5,
  },
  up: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  profileBanner: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  profileDiv: {
    alignItems: 'center',
  },
  profileLeft: {
    // flexDirection: 'row',
    alignItems: 'center',
    // paddingLeft: 48, 
    // flexWrap: 'wrap',
  },
  profileSquare: {
    backgroundColor: '#FFF',
    height: 100,
    width: 100,
    marginTop: -50,
    zIndex: 10,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: colors.secondary,
  },
  profileName: {
    // flexDirection: 'column',
    alignItems: 'center',
  },
  input:{
    height: 40,
    paddingLeft: 6,
    paddingRight: 6,
  },
  names: {
    padding: 4,
    fontSize: 22,
    fontWeight: 'bold',
  },
  followers: {
    fontSize: 16,
  },
  divButton: {
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: colors.secondary, 
    width: 180,
    height: 37,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
    marginTop: 10,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonCancel: {
    backgroundColor: '#C70000',
    color: '#FFFFFF',
    fontSize: 16,
    paddingHorizontal: 14,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonView: {
    flexDirection: 'row',
    gap: 10,
  },
  profileInfo: {
    // width: '20%',
    // flexDirection: 'column',
    padding: 16,
    marginTop: 16,
  },
  description: {
    padding: 5,
    height: 100,
    borderWidth: 3,
    borderRadius: 12,
    borderColor: colors.secondary,
    backgroundColor: '#f3f2f3',
  },
  aboutTextArea: {
    fontWeight: 'normal',
    borderRadius: 5,
  },
  paragrafAbout: {
    // Text styling, overflow handling is not directly applicable
  },
  contact: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  socialInputContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%'
  },
  socialInput: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 10,
  }
});

export default UserProfile;
