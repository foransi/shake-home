var request_input = function(){
    $('#output_file').attr('disabled', false);
    $('#source_file').attr('disabled', false);
};
const sampleAnswer = "Case #1:\n10\nCase #2:\n20\nCase #3:\n3\nCase #4:\n7\nCase #5:\n9";
String.prototype.rtrim = function() {
	return this.replace(/\s+$/,"");
}
var isSame = function(str1, str2){
    var arr1 = str1.split('\n');
    var arr2 = str2.split('\n');
    if(arr1.length != arr2.length)  return false;
    for(var i = 0; i < arr1.length; i++){
        if( arr1[i].rtrim() !== arr2[i].rtrim())
            return false;
    }
    return true;
}
var submitAnswer = function(){
    // var reader = new FileReader();
    // reader.onload = function(){
    //     var text = reader.result;
    //     text = text.replace(/\r\n/g, "\n");
    //     text = text.replace(/\r/g, "\n");
    // }
    
    var output_size = 0;
    if( $('#output_file')[0].files[0] ){
        output_size = $('#output_file')[0].files[0].size;
    }else{
        alert('제출할 출력 파일을 선택해주세요.');
        return;
    }
   
    var source_size = 0;
    // if( $('#source_file')[0].files[0] ){
    //     source_size = $('#source_file')[0].files[0].size;
    // }else{
    //     alert('소스코드 혹은 답안 파일을 선택해주세요.');
    //     return;
    // }

    if(output_size > 5*1024*1024 || source_size > 1*1024*1024){
        alert('제출하는 파일의 크기 제한을 지켜주세요.');
        return;
    }

    $('#modalSubmit').modal().hide();
    reader = new FileReader();
    reader.onload = function(e){
        var text = reader.result;
        text = text.replace(/\r\n/g, "\n");
        if(isSame(sampleAnswer, text) || isSame(sampleAnswer+"\n", text)){
            alert('예제 정답입니다!');
        }else{
            alert('예제 오답입니다!');
        }
    };

    reader.readAsText($('#output_file')[0].files[0]);
}