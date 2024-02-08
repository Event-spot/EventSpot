import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PageLink from './PageLink';
import { PaginationItems } from './PaginationLogic';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  maxLength: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, lastPage, maxLength, setCurrentPage }) => {
  const pageNums = PaginationItems(currentPage, lastPage, maxLength);

  const handlePageClick = (pageNum: number) => {
    setCurrentPage(pageNum);
    // scrollToTop(); Możesz zaimplementować scrollToTop w React Native, jeśli jest to konieczne
  };

  return (
    <View style={styles.pagination}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <PageLink disabled={currentPage === 1} onClick={() => handlePageClick(currentPage - 1)}>
          <Ionicons name="chevron-back-outline" size={24} />
        </PageLink>
        {pageNums.map((pageNum, idx) => (
          <PageLink key={idx} active={currentPage === pageNum} disabled={isNaN(pageNum)} onClick={() => handlePageClick(pageNum)}>
            <Text>{!isNaN(pageNum) ? pageNum.toString() : '...'}</Text>
          </PageLink>
        ))}
        <PageLink disabled={currentPage === lastPage} onClick={() => handlePageClick(currentPage + 1)}>
          <Ionicons name="chevron-forward-outline" size={24} />
        </PageLink>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    alignItems: 'center',
  },
});

export default Pagination;
