import React, { useState, useEffect } from "react";
import { supabase } from "../../Providers/LoginContoller";
import "./minSide.scss";
import { GiRamProfile } from "react-icons/gi";
import Footer from "../Forside/Footer/Footer";

const UserComments = () => {
  const [comments, setComments] = useState([]);
  const [editComment, setEditComment] = useState(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUser(user);
        fetchUserComments(user.id);
      }
    };

    fetchUser();
  }, []);

  const fetchUserComments = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("user_comments")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setComments(data);
    } catch (error) {
      console.error("Error fetching user comments:", error.message);
    }
  };

  const handleEditComment = (comment) => {
    setEditComment(comment);
    setNewCommentText(comment.comment);
  };

  const handleUpdateComment = async (commentId) => {
    try {
      const { data, error } = await supabase
        .from("user_comments")
        .update({ comment: newCommentText })
        .eq("id", commentId)
        .select();

      if (error) {
        throw error;
      }

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? data[0] : comment
        )
      );
      setEditComment(null);
      setNewCommentText("");
    } catch (error) {
      console.error("Error updating comment:", error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const { error } = await supabase
        .from("user_comments")
        .delete()
        .eq("id", commentId);

      if (error) {
        throw error;
      }

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };

  return (
    <section className="user-comments-section">
      <h2>Mine Kommentarer</h2>

      <article className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-avatar">
                <GiRamProfile />
              </div>
              <div className="comment-content">
                <div className="comment-header">
                  <strong>{comment.title}</strong>
                  <span>{new Date(comment.created_at).toLocaleString()}</span>
                </div>
                {editComment && editComment.id === comment.id ? (
                  <>
                    <textarea
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                    />
                    <button onClick={() => handleUpdateComment(comment.id)}>
                      Opdater
                    </button>
                    <button onClick={() => setEditComment(null)}>
                      Annuller
                    </button>
                  </>
                ) : (
                  <>
                    <p>{comment.comment}</p>
                    <button onClick={() => handleEditComment(comment)}>
                      Rediger
                    </button>
                    <button onClick={() => handleDeleteComment(comment.id)}>
                      Slet
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Ingen kommentarer fundet.</p>
        )}
      </article>
      <Footer></Footer>
    </section>
  );
};

export default UserComments;
