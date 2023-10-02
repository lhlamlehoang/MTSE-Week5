$(document).ready(function() {

 function compileHBS(){
  const source = $("#post-template").html();
  const template = Handlebars.compile(source);
  
  const renderedHTML = template(template);
  $("#output").html(renderedHTML);
  
 }
  compileHBS();

  let id = 0;


  const overlay = $("#overlay");
  const addForm = $("#addForm");
  const btnShowAdd = $("#btnShowAdd");
  const btnAdd = $("#btnAdd");
  const addName = $("#addName");
  const addContent = $("#addContent");
  const btnCloseAdd = $("#btnCloseAdd");
  const btnComment = $(".btnComment");

  btnShowAdd.click(function(){
    addForm.show();
    overlay.show();
  })

  btnAdd.click(function(event){
    event.preventDefault();

    $.ajax({
      url: '/addPost',
      method: "POST",
      data: {
        name: addName.val(),
        content: addContent.val()
      },
      success: function(data){
        alert('Added a new post!');
        window.location.href = '/';
      },
      error: function(error){
        console.log(`Error when add a new post: ${error}`);
      }
    })
  })

  btnCloseAdd.click(function(event){
    event.preventDefault();

    addForm.hide();
    overlay.hide();
  })

  btnComment.click(function(event){
    let postId = $(this).data("id");
    const commentContent = $(`.commentContent${postId}`);
    $.ajax({
      url: `/addComment/${postId}`,
      method: 'POST',
      data:{
        comment: commentContent.val().trim()
      },
      success: function(){
        alert(`Added a comment to post ${postId}`);
        window.location.href = '/';
      },
      error: function(error){
        console.log(`Error when adding a new comment: ${error}`);
      }
    })
  })

  const editForm = $("#editForm");
  const deleteForm = $("#deleteForm");
  const btnEdit = $("#btnEdit");
  const btnCloseEdit = $("#btnCloseEdit");
  const btnDelete = $("#btnDelete");
  const btnCancel = $("#btnCancel");


   // Handle click events on "Edit" and "Delete" options
   $(`.btnShowEdit`).click(function() {
    overlay.show();
    editForm.show();
    id = $(this).data("id");
  });

  $(".btnShowDelete").click(function() {
    overlay.show();
    deleteForm.show();
    id = $(this).data("id");
  })

  

  btnEdit.click(function(event){
    event.preventDefault();

    $.ajax({
      url: '/editPost/' + id,
      method: 'POST',
      data:{
          name: $("#editName").val(), content: $("#editContent").val()
      },
      success: function(data){
        alert(`Edited post ${id}`)
        window.location.href = '/';
      },
      error: function(error){
        console.log(`Failed to delete post ${id} with error ${error}`);
      }
    })
  })

  btnCloseEdit.click(function(event){
    event.preventDefault();
    editForm.hide();
    overlay.hide();
  })


  btnDelete.click(function(event){
    event.preventDefault();
    $.ajax({
      url: '/deletePost/' + id,
      method: "POST", 
      success: function(){
        alert(`Deleted post ${id}`);
        window.location.href = '/';
      },
      error: function(error){
        console.log(`Failed to delete post ${id} with error ${error}`);
      }
    })
  })

  btnCancel.click(function(event){
    event.preventDefault();
    overlay.hide();
    deleteForm.hide();
  })
})

