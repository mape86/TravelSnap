import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface CommentItemProps {
  comment: Comment;
}

interface CommentSectionProps {
  uri: string;
}

interface Comment {
  userComment: string;
  userName: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ uri }) => {
  const [comments, setComments] = useState<Comment[]>([]);
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

      const commentsData = querySnapshot.docs.map((doc) => doc.data());
      const comments = commentsData.map((comment) => ({
        userComment: comment.userComment,
        userName: comment.userName,
      }));

      setComments(comments);
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
      setComments([...comments, { userComment: newComment, userName: user.displayName }]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding new comment:", error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShowComments(!showComments)}>
        <Text className="font-bold mb-2">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </Text>
      </TouchableOpacity>
      {showComments && (
        <View>
          {comments.map((comment, index) => (
            <CommentItem key={index} comment={comment} />
          ))}
        </View>
      )}

      <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 3 }}>
        <TextInput
          placeholder="Leave a comment..."
          value={newComment}
          onChangeText={(text) => setNewComment(text)}
          editable={user !== null}
          autoCorrect={false}
          className="flex-1 border rounded-full px-6 py-4 mr-2"
        />

        <TouchableOpacity
          onPress={saveNewComment}
          disabled={!user}
          className="px-2 bold text-system-brandDark"
          style={{ opacity: user !== null ? 1 : 0.5 }}
        >
          <Text>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => (
  <View className="flex-row items-center p-2">
    <Text className="font-bold mr-2">{comment.userName}</Text>
    <Text>{comment.userComment}</Text>
  </View>
);

export default CommentSection;
