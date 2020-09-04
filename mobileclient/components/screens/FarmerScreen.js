import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
  Modal,
  TextInput,
} from 'react-native';

import { getFarmers } from '../Action/user';
import {
  likeFarmers,
  disLikeFarmers,
  farmersFeedback,
} from '../Action/ratings';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';

const FarmerScreen = ({
  //getFarmers,
  //likeFarmers,
  //disLikeFarmers,
  //farmersFeedback,
  user: { isLoading, users },

  navigation: { navigate, replace },

  ratings: { comments },
}) => {
  const dispatch = useDispatch();
  const [state, setstate] = useState({ data: [] });
  const [likes, setLikes] = useState({ liked: [] });
  const [comment, setComment] = useState({ feedback: [] });
  const [modal, setModal] = useState({ show: false, farmerSelected: [] });

  useEffect(() => {
    (() => {
      dispatch(getFarmers());
      setstate({ ...state, data: users });
    })();
  }, []);

  const goToProducts = (item) => {
    navigate('STACK_PRODUCT', { id: item });
  };

  const handleLike = (email) => {
    (() => {
      dispatch(likeFarmers(email));

      state.data.map((item) => {
        if ((email = item.email)) {
          setstate([
            {
              ratings: {
                thumbsUp: item.ratings.thumbsUp + 1,
              },
            },
          ]);
        }
      });
      dispatch(getFarmers());
      setstate({ ...state, data: users });
    })();
  };

  const handleDisLike = (email) => {
    (() => {
      dispatch(disLikeFarmers(email));
      state.data.map((item) => {
        if ((email = item.email)) {
          setstate([
            {
              ...state,
              ratings: {
                thumbsDown: item.ratings.thumbsDown + 1,
              },
            },
          ]);
        }
      });
    })();
  };

  const openModal = (item) => {
    setModal({ farmerSelected: item, show: true });
  };

  const farmerComment = () => {
    (() => {
      dispatch(farmersFeedback(modal.farmerSelected.email, comment.feedback));
      setModal({ ...modal, show: false });
    })();
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={state.data}
        keyExtractor={(item) => {
          return item._id;
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity onPress={() => goToProducts(item._id)}>
                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.title}>{item.name}</Text>
                      <Text>{item.email}</Text>
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                      <View style={styles.socialBarSection}>
                        <TouchableOpacity
                          style={styles.socialBarButton}
                          onPress={() => {
                            handleLike(item.email);
                          }}
                        >
                          <Image
                            style={styles.icon}
                            source={require('../assets/thumbs_up.png')}
                          />
                          <Text style={styles.socialBarLabel}>
                            {item.ratings.thumbsUp}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.socialBarSection}>
                        <TouchableOpacity
                          style={styles.socialBarButton}
                          onPress={() => openModal(item)}
                        >
                          <Image
                            style={styles.icon}
                            source={require('../assets/comment.png')}
                          />
                          <Text style={styles.socialBarLabel}>
                            {item.ratings.comments.length}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.socialBarSection}>
                        <TouchableOpacity
                          style={styles.socialBarButton}
                          onPress={() => handleDisLike(item.email)}
                        >
                          <Image
                            style={styles.icon}
                            source={require('../assets/thumbs_down.jpg')}
                          />
                          <Text
                            rkType='primary4 hintColor'
                            style={styles.socialBarLabel}
                          >
                            {item.ratings.thumbsDown}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          );
        }}
      />
      <Modal animationType='slide' transparent={false} visible={modal.show}>
        <>
          <View style={styles.popupOverlay}>
            <View style={styles.popup}>
              <View style={styles.popupContent}>
                <Text style={styles.name}>{modal.farmerSelected.name}</Text>

                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  value={state.feedback}
                  onChangeText={(text) =>
                    setComment({ ...comment, feedback: text })
                  }
                />
              </View>
            </View>
          </View>

          <Button title='Leave Feedback' onPress={() => farmerComment()} />
        </>
      </Modal>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  ratings: state.ratings,
});

export default connect(mapStateToProps, {
  getFarmers,
  likeFarmers,
  disLikeFarmers,
  farmersFeedback,
})(FarmerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: '#E6E6E6',
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: '#f7fbe1',
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  time: {
    fontSize: 13,
    color: '#808080',
    marginTop: 5,
  },
  icon: {
    width: 25,
    height: 25,
    backgroundColor: '#f7fbe1',
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  popup: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: '#00000057',
    flex: 1,
    marginTop: 30,
  },
  popupContent: {
    margin: 5,
    height: '90%',
  },
  modalInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
