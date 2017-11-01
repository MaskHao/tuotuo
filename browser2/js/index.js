/**
 * Created by WillWang on 2016/12/6.
 */
$(function () {
    // $('.add').on('click',addSubmenu(0));
    // var  a = 0, b = 0,c = 0;
    // function addSubmenu(num){
    //     if(num<4){
    //         num++;
    //         var adds = '<tr class="first ft_'+num+'">\
    //         <td><input type="text">   </td>\
    //         \
    //         </tr>';
    //         console.log(adds);
    //     }
    // }
    $('.selects').change(function () {
        var num = $(this).find('option:selected').attr('value');
        var className = $(this).attr('class');
        console.log(className+"_"+num);
        $(this).parent().next().children()
    })
})


