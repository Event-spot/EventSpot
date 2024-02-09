import React, { useState, useEffect, useRef} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, StyleSheet, Linking } from 'react-native';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useNavigation, RouteProp  } from '@react-navigation/native';
import { RootStackParamList } from '../Types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import Attendee from '../components/Attendee/Attendee';
import Detail from '../components/Detail/Detail';
import Icon from 'react-native-vector-icons/Ionicons';

type Event = {
    id:number;
   name:string;
   localization:string;
  };
  type Comment = {
    user: any;
    id:number;
    content:string;
    createDate: string;
    firstname: string;
    lastname:string;
  };
  type Attendee = {
    id:number;
    firstname:string;
    lastname:string;
    avatarImage: string;
  };
  type Detail = {
    general_information:string;
    competitions:string;
    localization_details:string;
  }
  type Map ={
    localization:string;
    date:Date;
  }
  
  type Params = {
    params: {
      eventID: string;
    };
  };
  type EventProfileRouteProp = RouteProp<RootStackParamList, 'EventDetails'>;
  type Props = {
      route: EventProfileRouteProp;
    };

 const EventDetails: React.FC<Props> = ({route}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const defaultBanner = require('../assets/images/isb.png');
    const defaultAvatar = require('../assets/images/question.png');
    const { eventID } = route.params;
    const GET_EVENTS= gql`
  query{
    eventById(eventId: ${eventID}){
      id,
      name,
      localization,
      date,
      general_information,
      competitions,
      localization_details,
      bannerImage,
      attendeesCount,
      organizer {
        id
        avatarImage
        firstname
        lastname
      }
      attendees{
        id,
        firstname,
        lastname,
        avatarImage
      }
      comments {
        id
        content
        createDate
        user {
          id
          firstname
          lastname
          avatarImage
        }
      }
  
    }
  }
  `;
  
  const UPDATE_EVENT_MUTATION = gql`
    mutation UpdateEvent($updateEventArgs: UpdateEventArgs!) {
      updateEvent(updateEventArgs: $updateEventArgs)
    }
  `;
  const JOIN_EVENT_MUTATION = gql`
    mutation joinEvent($eventId: Int!, $userId: Int!){
      joinEvent(eventId: $eventId, userId: $userId)
    }
    `;
    const LEAVE_EVENT_MUTATION = gql`
    mutation leaveEvent($eventId: Int!, $userId: Int!){
      leaveEvent(eventId: $eventId, userId: $userId)
    }
    `;
    const ADD_COMMENT_MUTATION = gql`
    mutation addComment($userId: Int!, $eventId: Int!, $content: String!){
      addComment(addCommentInput:{user:$userId, event: $eventId, content: $content})
    }
    `;
    const { loading, error, data, refetch } = useQuery(GET_EVENTS);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedBackground, setSelectedBackground] = useState<File | null>(null);
    const [eventDetails, setEventDetails] = useState({
      editedName: '',
      editedLocalization: '',
      editedDate: '', 
      editedGeneral_information: '',
      editedCompetitions: '',
      editedLocalization_details: ''
    });
    // const { currentUser } = useAuth();
    const [isOrganizer, setIsOrganizer] = useState(false);
    const [isAlreadyIn, setIsAlreadyIn] = useState(false);
    const [updateEvent] = useMutation(UPDATE_EVENT_MUTATION);
    const [joinEvent] = useMutation(JOIN_EVENT_MUTATION);
    const [leaveEvent] = useMutation(LEAVE_EVENT_MUTATION);
    const [addComment ] = useMutation(ADD_COMMENT_MUTATION);
    // useEffect(() => {
    //     if (data && data.eventById && currentUser) {
    //       setIsOrganizer(data.eventById.organizer.id === currentUser.id);
    //       const isParticipant = data.eventById.attendees.some((attendee: any)=> attendee.id === currentUser.id);
    //       setIsAlreadyIn(isParticipant);
    //     }
    //   }, [data, currentUser]);
    
      if (loading) return <Text>Loading...</Text>;
      if (error) return <Text>Error: {error.message}</Text>;
    
      const event = data.eventById;
      if (!event) return <Text>Event not found</Text>;
      
      const handleDetailChange = (name: string, value: string) => {
        setEventDetails(prevDetails => ({
          ...prevDetails,
          [name]: value,
        }));
      };
    
      const handleBackgroundSelect = (file: File) => {
        setSelectedBackground(file);
      };
    
      const toggleEditMode = () => {
        setIsEditing(!isEditing);
        setEventDetails({
          ...eventDetails,
          editedName: event.name,
          editedLocalization: event.localization,
          editedDate: event.date,
          editedGeneral_information: event.general_information,
          editedCompetitions: event.competitions,
          editedLocalization_details: event.localization_details
        });
      };

      const handleSave = async () => {
        try {
    
          const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;
    
          let newBannerUrl: string | undefined;
    
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

          if (selectedBackground) {
            const backgroundResult = await uploadToCloudinary(selectedBackground);
            newBannerUrl = backgroundResult.secure_url;
          }
    
          const response = await updateEvent({
            variables: {
              updateEventArgs: {
                id: eventID,
                name: eventDetails.editedName,
                localization: eventDetails.editedLocalization,
                date: eventDetails.editedDate,
                general_information: eventDetails.editedGeneral_information,
                competitions: eventDetails.editedCompetitions,
                localization_details: eventDetails.editedLocalization_details,
                bannerImage: newBannerUrl,
              },
            },
          });
          setIsEditing(false);
          await refetch();
        } catch (error) {
          console.error("Error updating event:", error);
        }
      };
      const cancelEdit = () => {
        setIsEditing(false);
      };
    
    //   const handleJoin = async () => {
    //     if (!currentUser) {
    //       Notifications.show({ title: 'Zaloguj się', message: 'Musisz być zalogowany, aby dołączyć do wydarzenia.', color: 'red' });
    //       return;
    //     }
      
    //     try {
    //       await joinEvent({
    //         variables: {
    //           eventId: parseInt(eventID, 10),
    //           userId: currentUser.id, 
    //         }
    //       });
    //       Notifications.show({ title: 'Sukces', message: 'Dołączyłeś do wydarzenia.', color: 'green' });
    //       refetch(); 
    //     } catch (error) {
    //       console.error('Error joining event:', error);
    //       Notifications.show({ title: 'Błąd', message: 'Nie udało się dołączyć do wydarzenia.', color: 'red' });
    //     }
    //   };
    // const handleLeave = async () => {
    //     if (!currentUser) {
    //       Notifications.show({ title: 'Zaloguj się', message: 'Musisz być zalogowany, aby opuścić wydarzenie.', color: 'red' });
    //       return;
    //     }
      
    //     try {
    //       await leaveEvent({
    //         variables: {
    //           eventId: parseInt(eventID, 10),
    //           userId: currentUser.id, 
    //         }
    //       });
    //       Notifications.show({ title: 'Sukces', message: 'Opuściłeś wydarzenie.', color: 'green' });
    //       refetch(); 
    //     } catch (error) {
    //       console.error('Error leaving event:', error);
    //       Notifications.show({ title: 'Błąd', message: 'Nie udało się opuścić wydarzenia.', color: 'red' });
    //     }
    //   };
    
    // const handleSubmitComment = async () => {
    //     const comment = textareaRef.current?.value;
    //     if (comment && currentUser) {
    //       try {
    //         await addComment({
    //           variables: {
    //             eventId: event.id,
    //             userId: currentUser.id,
    //             content: comment,
    //           },
    //         });
            
    //         refetch();
            
    //         if (textareaRef.current) {
    //           textareaRef.current.value = '';
    //         }

            //     Notifications.show({ title: 'Sukces', message: 'Komentarz został dodany.', color: 'green' });
            // } catch (error) {
            //   console.error('Error submitting comment:', error);
            //   Notifications.show({ title: 'Błąd', message: 'Nie udało się dodać komentarza.', color: 'red' });
            // }
            // }
            // };
            type UserProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Events'>;
             const navigation = useNavigation<UserProfileNavigationProp>();
            return (
                <ScrollView style={styles.main}>
                <View style={styles.main}>
                
                  
                  <View style={styles.up}>
                    {isEditing ? (
                        <View><Text>tu powinien być upload</Text></View>
                    
                  ) : (
                    <View>
                      <Image
                        style={styles.eventbanner}
                        source={event.bannerImage ? { uri: event.bannerImage } : require('../assets/images/profile_background.png')}
                        width={100} 
                        height={100} 
                      />
                      <View style={styles.overlay}></View>
                    </View>
                  )}
                  </View>
                   
      <View style={styles.eventDiv}>
        <View style={styles.eventLeft}>
          <View style={styles.eventSquare}>
            <TouchableOpacity onPress={() => navigation.navigate("Events")}>
                <Image 
                 // style={styles.avatar} 
                  source={event.organizer.avatarImage ? { uri: event.organizer.avatarImage } : require('../assets/images/question.png')}
                  alt="Person Avatar" 
                  width={100} 
                  height={100} 
                />
            </TouchableOpacity>
          </View>
          <View style={styles.eventName}>
            <Text>{event.organizer.firstname}</Text>
            <Text>{event.organizer.lastname}</Text>
          </View>
        </View>
        <View style={styles.eventName}>
        {isEditing ? (
          <>
            <TextInput 
              placeholder="Nazwa wydarzenia"
              value={eventDetails.editedName} 
              onChangeText={text => setEventDetails({ ...eventDetails, editedName: text })}
            />
          </>
        ) : (
          <>
            <Text>{event.name}</Text>
          </>
        )}
        </View>
        <View>
        <View style={styles.divButton}>
        {isOrganizer ? (
          isEditing ? (
            <>
              <TouchableOpacity style={styles.button} onPress={handleSave}><Text>Zapisz zmiany</Text></TouchableOpacity>
              <TouchableOpacity style={styles.buttonCancel} onPress={cancelEdit}><Text>Anuluj</Text></TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.button} onPress={toggleEditMode}><Text>Edytuj Event</Text></TouchableOpacity>
          )
        ) : isAlreadyIn ? (
          <TouchableOpacity style={styles.buttonCancel} /*onPress={handleLeave}*/><Text>Opuść</Text></TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} /*onPress={handleJoin}*/><Text>Dołącz</Text></TouchableOpacity>
        )}
        </View>
        </View>
       
      </View>


      <View style={styles.next}>
        <View style={styles.insidenext1}>
        
        <View style={styles.participantscomp}>
          <View >
          <Text>Wezmą udział: {event.attendeesCount}</Text> 
          </View>
          <View style={styles.participantsTable}>
         {event.attendees?.map((attendee: Attendee, index: number) => (
          <Attendee
                key={index}
                id={attendee.id}
                imie={attendee.firstname}
                nazwisko={attendee.lastname}
                avatarImage={attendee.avatarImage}
              />
            ))
          }
        </View>
        </View>
        </View>

        <View style={styles.insidenext2}>
        <Detail
          informacje_ogolne={event.general_information}
          konkursy={event.competitions}
          szczegoly_dojazdu={event.localization_details}
          isEditing={isEditing}
          handleDetailChange={handleDetailChange}
            />
        </View>

        <View style={styles.insidenext3}>
        {/* <Map
          lokalizacja={event.localization}        
          data={new Date(event.date)}
          isEditing={isEditing}
          handleDetailChange={handleDetailChange}
        /> */}
        </View>
      </View>

        <View style={styles.afternext}>
          <View style={styles.komentarze}>
            {/* {currentUser && (
              <div className={styles.write}>
                <textarea
                  ref={textareaRef}
                  placeholder='Napisz komentarz'
                /> */}
                {/* <Button fullWidth onClick={handleSubmitComment} color="#8A5FC0" radius="xl">Wyślij</Button> */}
              {/* </div> */}
            {/* )} */}
            {/* {event.comments?.map((comment: Comment, index: number) => (
              <Comment
                key={index}
                id={comment.id}
                userId={comment.user.id}
                imie={comment.user.firstname}
                nazwisko={comment.user.lastname}
                content={comment.content}
                createDate={comment.createDate}
                avatarImage={comment.user.avatarImage}
              />
                ))
              } */}
          </View>
        </View>
    </View>
    </ScrollView>
  );
};



const colors = {
    primary:'#2E1A47',
    background: '#f3f2f3;', 
    secondary: '#8A5FC0',
    white: '#FFFFFF',
    cancel: '#C70000',
  };

const styles = StyleSheet.create({


    next: {
       
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
      eventbanner: {
        width: '100%',
        height: '100%',
        objectFit:'cover',
        borderRadius: 10,
        borderWidth:2,
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
      eventDiv: {
        alignItems: 'center',
      },
      eventLeft: {
        alignItems: 'center',
      },
      eventSquare: {
        backgroundColor: '#FFF',
    height: 100,
    width: 100,
    marginTop: -50,
    zIndex: 10,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: colors.secondary,
      },
      eventName: {
        alignItems: 'center',
        // Wewnątrz stylów nie możemy definiować stylów dla tagów p - każdy z nich będzie musiał być stylizowany oddzielnie
      },
      eventNameText: { // Styl dla tagów <p> wewnątrz eventName
        padding: 4,
        fontSize: 22,
        fontWeight: 'bold',
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
      
      insidenext1: {
        height: '100%',
        width: '100%',
      },
      participantscomp: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        color: colors.primary, 
        marginTop: 10,
        fontWeight: 'bold',
      },
      participantsTable: {
       textAlign:'center',
        borderWidth: 2,
        borderColor: colors.secondary,
        borderRadius: 10,
        minHeight:100,
        maxHeight: 300,
        minWidth:250,
      },
      insidenext2: {
        backgroundColor: colors.primary,
        height:100,
        
        width: '100%',
      },
      insidenext3: {
        height: '100%',
        width: '100%',
        
      },

      afternext: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'stretch', // W React Native "stretch" jest domyślną wartością dla alignItems
      },
      komentarze: {
        width: '60%',
        alignSelf: 'center', // "margin: auto" można osiągnąć za pomocą "alignSelf: 'center'"
        alignItems: 'center',
        flexDirection: 'column',
      },
      write: {
        width: '80%',
        marginBottom: 10,
      },
      writeTextarea: {
        marginTop: 10,
        width: '100%',
        minHeight: 100,
        borderRadius: 20,
        // W React Native nie ma właściwości "resize", ponieważ nie ma potrzeby dostosowywania rozmiaru inputów przez użytkownika
        padding: 10,
        // Nie ma również właściwości "box-sizing" w React Native
        overflow: 'hidden', // W React Native "overflow-y" nie jest dostępne; używaj "overflow"
      },
});

export default EventDetails; 
