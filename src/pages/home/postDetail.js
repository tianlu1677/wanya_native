import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import Loading from '@/components/Loading';
import {getTopic} from '@/api/home_api';

const PostDetail = () => {
  const loadData = async () => {
    const res = await getTopic(796);
    console.log(res);
  };

  useEffect(() => {
    loadData();
  }, []);

  return <Loading />;
};

export default PostDetail;
