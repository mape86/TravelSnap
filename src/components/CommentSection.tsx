import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface CommentItemProps {
  comment: string;
  userName: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, userName }) => (
  <View className="flex-row items-center p-2">
    <Text className="font-bold">{userName}</Text>
    <Text>{comment}</Text>
  </View>
);

interface CommentSectionProps {
  uri: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ uri }) => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const fetchComments = async () => {
    const firestore = getFirestore();
    const imageAttributesCollection = collection(firestore, "ImageAttributes");

    try {
      const q = query(imageAttributesCollection, where("imageId", "==", uri));
      const querySnapshot = await getDocs(q);

      const commentsData = querySnapshot.docs.map((doc) => doc.data().userComment);
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [uri]);

  const saveNewComment = async () => {
    if (!user) {
      console.log("User is not logged in. Cannot add comment.");
      return;
    }

    const firestore = getFirestore();
    const imageAttributesCollection = collection(firestore, "ImageAttributes");

    try {
      const newCommentData = {
        imageId: uri,
        userComment: newComment,
        userId: user.uid,
        userName: user.displayName,
      };

      const newCommentRef = await addDoc(imageAttributesCollection, newCommentData);

      console.log("New comment added with ID:", newCommentRef.id);
      setComments([...comments, newComment]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding new comment:", error);
    }
  };

  return (
    <View className="p-5">
      <TouchableOpacity onPress={() => setShowComments(!showComments)}>
        <Text className="font-bold">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </Text>
      </TouchableOpacity>
      {showComments && (
        <View>
          {comments.map((comment, index) => (
            <CommentItem key={index} comment={comment} userName={user.displayName} />
          ))}
        </View>
      )}

      <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 3 }}>
        <TextInput
          placeholder="Leave a comment..."
          value={newComment}
          onChangeText={(text) => setNewComment(text)}
          editable={user !== null}
          className="flex-1 border rounded-full p-3"
        />

        <TouchableOpacity
          onPress={saveNewComment}
          disabled={!user}
          style={{ padding: 5, opacity: user !== null ? 1 : 0.5 }}
        >
          <Text>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentSection;
