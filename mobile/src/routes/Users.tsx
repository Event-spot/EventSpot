import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import Person from '../components/Person/Person';
import Pagination from '../components/Pagination/Pagination';
import Upbar from '../components/Upbar/Upbar';

interface User {
    id: number;
    firstname: string;
    lastname: string;
    localization: string;
    followersCount: number;
    followingsCount: number;
    eventsCount: number;
    avatarImage: string;
}

export const GET_USERS = gql`
    query {
        users {
            id
            firstname
            lastname
            localization
            followersCount
            followingsCount
            eventsCount
            avatarImage
        }
    }
`;
interface UsersQueryResponse {
    users: User[];
}
export default function Users() {
    const { loading, error, data } = useQuery<UsersQueryResponse>(GET_USERS);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; 
    const lastPage = data ? Math.ceil(data.users.length / itemsPerPage) : 1;
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [originalUsers, setOriginalUsers] = useState<User[]>([]);
    
    useEffect(() => {
        if (data?.users) {
          setOriginalUsers([...data.users]);
        }
      }, [data?.users]);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error</Text>;

    const filteredAndSortedUsers = originalUsers
    .filter(user => {
        const fullName = `${user.firstname?.toLowerCase() || ""} ${user.lastname?.toLowerCase() || ""}`;
        const userLocalization = user.localization?.toLowerCase() || "";
        return fullName.includes(searchQuery.toLowerCase()) || userLocalization.includes(searchQuery.toLowerCase());
      })
    .sort((a, b) => {
      if (sortOption === '') {
        return 0;
      }
      switch (sortOption) {
        case 'odwiedzoneSpoty':
          return b.eventsCount - a.eventsCount;
        case 'obserwujacy':
          return b.followersCount - a.followersCount;
        case 'obserwowani':
          return b.followingsCount - a.followingsCount;
        default:
          return 0;
      }
    });
  
      

    return (
        <View style={styles.main}>
            <ScrollView>
            <Upbar
                pageType="uzytkownicy"
                onSortChange={setSortOption}
                onSearchQueryChange={setSearchQuery}
                sortOption = {sortOption}
            />
                <View style={styles.persons}>
                {filteredAndSortedUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((user, index) => (
                    <Person
                        key={index}
                        id={user.id}
                        imie={user.firstname}
                        nazwisko={user.lastname}
                        lokalizacja={user.localization || "Miejscowość"}
                        odwiedzoneSpoty={user.eventsCount}
                        obserwowani={user.followingsCount}
                        obserwujacy={user.followersCount}
                        avatarImage={user.avatarImage}
                    />
                ))}
                </View>
            </ScrollView>
            <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                maxLength={5}
                setCurrentPage={setCurrentPage}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
      },
      persons: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
});
