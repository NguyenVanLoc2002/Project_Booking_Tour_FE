import * as Icons from 'react-icons/ai';

function DieuKien() {
  const IconDisplay = ({ iconName }) => {
    const IconComponent = Icons[iconName]; // Lấy biểu tượng dựa trên tên truyền vào

    return (
      <div className="flex items-center space-x-2">
        {IconComponent ? <IconComponent size={24} /> : null} {/* Hiển thị biểu tượng nếu tồn tại */}
      </div>
    );
  };

  return (
    <>

      <div className=" border  mb-4 rounded-lg border-textColorCustom w-2/3 text-base ">
        <h2 className="font-bold p-4">
          Điều kiện tour
        </h2>
        <hr className="border-3 border-textColorCustom w-full mb-4" />
        <ul className="list-disc list-inside p-4">
          <li className="pb-5">
            <strong>Tour bao gồm:</strong>
            <ul className="list-none pl-5 space-y-1">
              <li>- Khách sạn: Phòng tiện nghi điều hoà, tivi, nóng lạnh khép kín 02-03 người/phòng.</li>
              <li>- 01 xe ô tô chỗ du lịch hiện đại, điều hòa, đời mới đưa đón theo chương trình</li>
              <li>- Bữa chính: 03 bữa sáng + 03 bữa trưa + 02 bữa tối theo chương trình.</li>
              <li>- Vé thắng cảnh vào cổng các điểm du lịch theo chương trình.</li>
              <li>- HDV nhiệt tình, kinh nghiệm, am hiểu kiến thức điểm phục vụ đoàn theo tour.</li>
              <li>- Bảo hiểm du lịch mức cao nhất 20.000.000đồng/vụ (Hai mươi triệu đồng).</li>
              <li>- Nước uống, khăn lạnh phục vụ đoàn: 01 chai nước + 01 khăn lạnh/ngày.</li>
              <li>- Thuốc, Y tế phục vụ theo tour.</li>
            </ul>
          </li>
          <li className="pb-5">
            <strong>Tour không bao gồm:</strong>
            <ul className="list-none pl-5 space-y-1">
              <li>- Chi phí ngủ phòng đơn và các chi phí cá nhân ngoài chương trình.</li>
              <li>- Vé vận trượt, vào vườn thanh long, xe địa hình.</li>
              <li>- Phí chênh lệch vé tham quan theo chiều cao của trẻ em tại các khu du lịch.</li>
              <li>- Thuế VAT 0.8%.</li>
            </ul>
          </li>

          <li className="pb-5">
            <strong>Lưu ý:</strong>
            <ul className="list-none pl-5 space-y-1">
              <li>- Mỗi gia đình chỉ có tiêu chuẩn là 1 trẻ em, trẻ em thứ 2 tính như người lớn, tính 100% giá tour.</li>
              <li>- Dưới 05 tuổi: Miễn phí giá tour. Bố mẹ tự lo ăn, nghỉ, vé thăm quan - nếu có.</li>
              <li>- Từ 05 - 10 tuổi: Tính 50% giá trọn gói: 01 suất ăn, vé thăm quan, bảo hiểm du lịch, 01 chỗ ngồi trên xe. Ngủ với cha mẹ.</li>
              <li>- Trẻ em thứ 2 tính như giá người lớn, tức 100% giá vé.</li>
              <li>- Từ 10 tuổi trở lên: Vui lòng thanh toán như người lớn.</li>
            </ul>
          </li>
          <li className="pb-5">
            <strong>Quy định hủy tour:</strong>
            <ul className="list-none pl-5 space-y-1">
              <li><strong>+ Quy định hủy đối với ngày lễ, tết</strong></li>
              <li>- Hủy trước 10 ngày khởi hành hoàn 50% phí tour</li>
              <li>- Hủy trước 03-09 ngày khởi hành hoàn 25% phí tour</li>
              <li>- Hủy trước 02 ngày khởi hành không hoàn phí tour</li>
              <li><strong>+ Quy định hủy đối với ngày thường</strong></li>
              <li>- Hủy trước 10 ngày khởi hành chịu hoàn 50% phí tour</li>
              <li>- Hủy trước 05-09 ngày khởi hành hoàn 50% phí tour.</li>
              <li>- Hủy trước 02-04 ngày khởi hành chịu hoàn 25% phí tour.</li>
              <li>- Hủy trước 1, ngày ngày khởi hành hoặc đến trễ không hoàn phí tour.</li>
            </ul>
          </li>
        </ul>

      </div>
    </>
  );
}

export default DieuKien;
