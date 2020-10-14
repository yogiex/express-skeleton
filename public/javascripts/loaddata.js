async function hapus_id(){
  await $(document).ready(function(){
  $('#btndelete').click(function(){
    var id = $('#idtodelete').val();
    $.ajax({
      url: '/users/'+ id,
      type: 'DELETE',
      dataType: 'json'
    })
  })
})
};