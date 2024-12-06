import { Modal, Typography} from 'antd';
import panda from "../../../assets/iconTour/panda.png";
const { Text } = Typography;

const DetailRefund = ({ visible, onClose, refundData }) => {

  return (
    <>
      <Modal

        visible={visible}
        onCancel={onClose}
        footer={null}
        width={600}
      >
        <div class="flex items-center mt-4">
          <div class="border-t border-gray-400 flex-1"></div>
          <span class="mx-4 text-gray-600 text-lg font-bold">HOÀN TIỀN</span>
          <div class="border-t border-gray-400 flex-1"></div>
        </div>
        {
          refundData?.status === "processing" ? (
            <div className='pl-4'>
              <div className='pt-4 pb-2'><Text className='font-bold text-red-500 text-base'>Thông tin hoàn tiền</Text></div>
              <div className='flex '>
                <div className='w-[50%] flex'>
                  <Text className='font-bold w-[40%]'>Mã hoàn tiền:</Text>
                  <Text className=' w-[50%]'>{refundData?.id}</Text>
                </div>
                <div className='w-[50%] flex'>
                  <Text className='font-bold w-[55%]'>Mã đơn đặt tour:</Text>
                  <Text>{refundData?.bookingId}</Text>
                </div>
              </div>
              <div className='flex'>
                <div className='w-[50%] flex'>
                  <Text className='font-bold w-[40%]'>Ngân hàng:</Text>
                  <Text>{refundData?.creditBank}</Text>
                </div>
                <div className='w-[50%] flex'>
                  <Text className='font-bold w-[55%]'>Số tài khoản:</Text>
                  <Text>{refundData?.creditNumber}</Text>
                </div>
              </div>
              <div className='flex'>
                <div className='w-[50%] flex'>
                  <Text className='font-bold w-[40%]'>Khách hàng:</Text>
                  <Text>{refundData?.customerName}</Text>
                </div>
                <div className='w-[50%] flex'>
                  <Text className='font-bold w-[55%]'>Ngày hoàn dự kiến:</Text>
                  <Text>{refundData?.expectedRefundDate}</Text>
                </div>
              </div>
              <div className='flex'>
                <div className='w-[50%] flex'>
                  <Text className='font-bold w-[40%]'>Số tiền gốc:</Text>
                  <Text>{Intl.NumberFormat('vi-VN', {
                    style: 'currency', currency: 'VND',
                  }).format(refundData?.price)}</Text>
                </div>
                <div className='w-[50%] flex'>
                  <Text className='font-bold w-[55%]'>Số tiền hoàn:</Text>
                  <Text>{Intl.NumberFormat('vi-VN', {
                    style: 'currency', currency: 'VND',
                  }).format(refundData?.priceRefund)}</Text>
                </div>
              </div>
              <div className='flex flex-col pt-6'>
                <div class="notice-box">
                  <img src={panda} alt="Icon" class="icon" />
                  <span class="text">BẠN ƠI LƯU Ý MỘT CHÚT:</span>
                </div>
                <Text className='pt-6 font-bold'>Sau khi hủy đơn đặt tour:<Text className='font-normal'> Hệ thống VietNam Travel mất 1-2 ngày để xử lý</Text></Text>
                <Text className='font-bold'>Trong thời gian hoàn tiền dự kiến: <Text className='font-normal'>Bạn yên tâm giúp VietNam Travel nhé, tiền sẽ về tài khoản nhanh thôi</Text></Text>
                <Text className='font-bold'>Trong trường hợp quá thời gian hoàn tiền dự kiến mà tiền vẫn chưa vào tài khoản: <Text className='font-normal'>Bạn có thể kiểm tra với Ngân hàng chủ thẻ về giao dịch hoàn tiền trước khi liên hệ với VietNam Travel nhé!</Text></Text>
                <Text className='font-bold'>Sau khi kiểm tra mọi thứ mà vẫn chưa được: <Text className='font-normal'>bạn hãy liên hệ đến hotline: 0338030540 để gặp bộ phận CSKH nhé!</Text></Text>
              </div>
            </div>
          ) : (
            <div className='pl-4'>
              <div className='pt-8 pb-2 '><Text className=' font-bold text-red-500 text-base'>Thông tin giao dịch</Text></div>
              <div className='flex'>
                <div className='flex flex-col w-44 font-bold'>
                  <Text>Mã giao dịch:</Text>
                  <Text>Ngân hàng:</Text>
                  <Text>Số tài khoản:</Text>
                  <Text>Khách hàng:</Text>
                  <Text>Nội dung:</Text>
                  <Text>Số tiền hoàn:</Text>
                </div>
                <div className='flex flex-col '>
                  <Text>{refundData?.transactionId}</Text>
                  <Text>{refundData?.creditBank}</Text>
                  <Text>{refundData?.creditNumber}</Text>
                  <Text>{refundData?.customerName}</Text>
                  <Text>Hoàn tiền cho đơn đặt tour {refundData?.bookingId}</Text>
                  <Text>{Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(refundData?.priceRefund)}</Text>
                </div>
              </div>
              <div className='pt-4 pb-2  '><Text className='font-bold text-red-500 text-base'>Thông tin hoàn tiền</Text></div>
              <div className='flex'>
                <div className='flex flex-col w-44 font-bold'>
                  <Text>Mã hoàn tiền:</Text>
                  <Text>Mã đơn đặt tour:</Text>
                  <Text>Hình thức:</Text>
                  <Text>Số phần trăm hoàn:</Text>
                  <Text>Số tiền gốc:</Text>
                  <Text>Số tiền hoàn:</Text>
                </div>
                <div className='flex flex-col'>
                  <Text>{refundData?.id}</Text>
                  <Text>{refundData?.bookingId}</Text>
                  <Text>Hoàn tiền theo % giao dịch</Text>
                  <Text>{refundData?.percentRefund}%</Text>
                  <Text>{Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(refundData?.price)}</Text>
                  <Text>{Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(refundData?.priceRefund)}</Text>
                </div>
              </div>
              <div className='pt-6 pb-6 flex justify-center'>
                <div class="notice-box">
                  <img src={panda} alt="Icon" class="icon" />
                  <span class="text">Giao dịch đã hoàn thành!</span>
                </div>
              </div>
            </div>)
        }
      </Modal>
    </>
  );
}

export default DetailRefund;
