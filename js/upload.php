<?php
/**
 * Script xử lý upload ảnh sản phẩm - Aurora
 * Lưu ảnh vào folder d:/----n/anhsp/
 */

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['product_image'])) {
    $target_dir = "../anhsp/";
    
    // Tạo folder nếu chưa có
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }

    $file_name = basename($_FILES["product_image"]["name"]);
    $target_file = $target_dir . $file_name;
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Kiểm tra xem có phải là ảnh thật không
    $check = getimagesize($_FILES["product_image"]["tmp_name"]);
    if($check !== false) {
        $uploadOk = 1;
    } else {
        echo json_encode(["status" => "error", "message" => "File không phải là ảnh."]);
        $uploadOk = 0;
        exit;
    }

    // Cho phép upload
    if (move_uploaded_file($_FILES["product_image"]["tmp_name"], $target_file)) {
        echo json_encode([
            "status" => "success", 
            "file_path" => "../anhsp/" . $file_name,
            "message" => "Ảnh đã được lưu vào folder anhsp"
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Có lỗi xảy ra khi lưu file."]);
    }
}
?>
