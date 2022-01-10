// console.log(axios);


function getApiData () {
    var promise = axios({
        url : 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //Thuộc tính đường dẫn do Backend quy định
        method : 'GET'  // Giao thức BackEnd quy định 
    });

    // Định nghĩa trường hợp call api thành công
    promise.then(function(result){
        //Hàm này sẽ gọi khi api thành công
        console.log('result',result.data);
        //gọi hàm tạo giao diện
        renderTabel(result.data);

    })
    //Định nghĩa trường hợp goi api thất bại
    promise.catch(function(error){
        console.log('error',error);
    })
}

getApiData();
function renderTabel(mangSinhVien){
    var htmlContent = '';
    for ( var i =0 ; i < mangSinhVien.length ; i++){
        //Mỗi lần duyệt lấy ra 1 sinh viên
        var sinhVien = mangSinhVien[i];
        htmlContent += `
        <tr>
           <td>${sinhVien.maSinhVien}</td>
           <td>${sinhVien.tenSinhVien}</td>
           <td>${sinhVien.email}</td>
           <td>${sinhVien.soDienThoai}</td>
           <td>${sinhVien.loaiSinhVien}</td>
           <td>${sinhVien.diemToan}</td>
           <td>${sinhVien.diemRenLuyen}</td>
           <td  >
           <button class = "btn btn-danger" onclick="xoaSinhVien('${sinhVien.maSinhVien}')" >Xóa</button>
           <button class = "btn btn-success" onclick="suaSinhVien('${sinhVien.maSinhVien}')" >Sửa</button>
            
           </td>
        </tr>
        `
        
    }
    document.querySelector('#tblSinhVien').innerHTML = htmlContent;
}

// Thêm sinh viên
document.querySelector('#btnThemSinhVien').onclick = function(){
    //Lấy thông tin người dùng nhập vào từ các thẻ input
    var sinhVien = new SinhVien();
    sinhVien.maSinhVien= document.querySelector('#maSinhVien').value;
    sinhVien.tenSinhVien= document.querySelector('#tenSinhVien').value;
    sinhVien.email= document.querySelector('#email').value;
    sinhVien.soDienThoai= document.querySelector('#soDienThoai').value;
    sinhVien.diemToan= document.querySelector('#diemToan').value;
    sinhVien.diemLy= document.querySelector('#diemLy').value;
    sinhVien.diemHoa= document.querySelector('#diemHoa').value;
    sinhVien.diemRenLuyen= document.querySelector('#diemRenLuyen').value;



    // Dùng axios gọi api ( request ulr backend)
    var promise = axios({
        url : 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien ',
        method : 'POST',
        data : sinhVien 
    })
    
    //Thành Công 
    promise.then(function(result){
        console.log('result',result.data);
        //Gọi lại api lấy danh sách sinh viên 
        getApiData();
    })
    
    //Thất bại
    promise.catch(function(err){
        console.log('error',err.response.data);
    })
}


// Xóa Sinh viên
function xoaSinhVien (maSinhVienClick){
    console.log('maSinhVien',maSinhVienClick);

    var promise = axios({
        url : 'http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=' + maSinhVienClick,
        method : 'DELETE'
    })
    //Thành công
    promise.then(function(result){
        console.log(result)
        getApiData();
    })

    //Thất Bại
    promise.then(function(err){
        console.log(err)
    })
}

// Sửa sinh viên

function suaSinhVien(maSinhVienClick){
    console.log('maSinhVienClick',maSinhVienClick)

    var promise = axios ({
        url : 'http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=' + maSinhVienClick,
        method : 'GET'
    });

    //Thành công
    promise.then(function(result){
        console.log(result);
        var sinhVien = result.data;
        //Gắn các giá trọ lên control phía trên
        document.querySelector('#maSinhVien').value = sinhVien.maSinhVien;
        document.querySelector('#tenSinhVien').value = sinhVien.tenSinhVien;
        document.querySelector('#diemToan').value = sinhVien.diemToan;
        document.querySelector('#diemLy').value = sinhVien.diemLy;
        document.querySelector('#diemHoa').value = sinhVien.diemHoa;
        document.querySelector('#diemRenLuyen').value = sinhVien.diemRenLuyen;
        document.querySelector('#email').value = sinhVien.email;
        document.querySelector('#soDienThoai').value = sinhVien.soDienThoai;
      

    })

    //Thất bại
    promise.catch(function(err){
        console.log(err.response.data)
    })

    document.querySelector('#btnCapNhatThongTin').onclick = function(){
        //Lấy thông tin người dùng nhập từ các thẻ input
        var sinhVien = new SinhVien();
        sinhVien.maSinhVien= document.querySelector('#maSinhVien').value;
        sinhVien.tenSinhVien= document.querySelector('#tenSinhVien').value;
        sinhVien.email= document.querySelector('#email').value;
        sinhVien.soDienThoai= document.querySelector('#soDienThoai').value;
        sinhVien.diemToan= document.querySelector('#diemToan').value;
        sinhVien.diemLy= document.querySelector('#diemLy').value;
        sinhVien.diemHoa= document.querySelector('#diemHoa').value;
        sinhVien.diemRenLuyen= document.querySelector('#diemRenLuyen').value;

        //Gọi api cập nhật
        var promise = axios({
            url:'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=' + sinhVien.maSinhVien,
            method : 'PUT',
            data: sinhVien
        });
        promise.then(function(result){
            console.log('result',result)
            window.location.reload(); //refesh lại trang
        })
        promise.catch(function(err){
            console.log('error',err)
        })

    }
}
