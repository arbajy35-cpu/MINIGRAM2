window.commentPost = function(postId){

  const commentsEl =

    document.getElementById(
      "comments-" + postId
    );

  if(!commentsEl) return;

  let count =

    parseInt(
      commentsEl.dataset.comments || "0"
    ) || 0;

  count++;

  commentsEl.dataset.comments =
    count;

  commentsEl.textContent =
    count + " comments";

  const post =

    window.STATE?.FEED?.find(
      p => p.id === postId
    );

  if(post){

    post.comments_count =
      count;

  }

};