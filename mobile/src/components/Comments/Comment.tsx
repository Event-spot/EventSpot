import { View, Text, Image, TouchableOpacity, ScrollView, TextInput,Dimensions, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { RootStackParamList } from '../../Types/navigationTypes';
import { colors } from '../../constants/colors';
import { StackNavigationProp } from '@react-navigation/stack';

const QuestionImage = require('../../assets/images/question.png');

type CommentProps ={
    id:number;
    userId:number;
    content:string;
    createDate:string;
    imie:string;
    nazwisko:string;
    avatarImage:string;
  }


  type UserProfileNavigationProp = StackNavigationProp<RootStackParamList, 'UserProfile'>;
  const Comment: React.FC<CommentProps>=({
    id,
    content,
    createDate,
    imie,
    nazwisko,
    avatarImage,
    userId
  })=>{
    const navigation = useNavigation<UserProfileNavigationProp>();
    const date = new Date(parseInt(createDate, 10));
    const formattedDate = date.toLocaleString('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    return(
        <View style={styles.comments}>
        <View style={styles.user}>
          <View style={styles.userimage}> 
            <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userID: id })}>
              <Image 
                style={styles.accountimage} 
                source={avatarImage ? { uri: avatarImage } : QuestionImage}
                alt={'Avatar Image'} 
                width={50}
                height={50}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.usercomment}>
            <View style={styles.nickndate}>
                <View style={styles.username}>
                  <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userID:id })}>
                   <Text>{imie} {nazwisko}</Text> 
                  </TouchableOpacity>
                </View>
              <View style={styles.date}><Text> {formattedDate}</Text></View>
            </View>
            <View style={styles.commentText}><Text>{content}</Text></View>
          </View>
        </View>
      </View>
    );
  };


  const windowWidth = Dimensions.get('window').width;

  const styles = StyleSheet.create({
    comments:{ 
    flex:1,
    flexDirection: 'column',
    fontWeight: 'bold',
    width: '100%',
    paddingVertical: 20,
    marginTop: 20,},
    user:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      borderRadius: 20,
      width: '100%',
      height: 100,
    },
    userimage:{
      marginTop: 5,
      width: '10%',
      justifyContent: 'center',
    },
    accountimage:{
      width: 50,
      height: 50,
      borderColor: colors.secondary,
      borderWidth: 1,
      borderRadius: 25,
    },
    usercomment:{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      padding: 10,
    },
    nickndate:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 2,
      borderBottomColor: colors.black, 
      width: '100%',
      color: colors.primary,
    },
    username:{},
    date:{},
    commentText:{
      textAlign: 'left',
      paddingTop:5,
      color: 'black',
      height: 100,
      fontWeight: '300',
    },
  });

  export default Comment;
  