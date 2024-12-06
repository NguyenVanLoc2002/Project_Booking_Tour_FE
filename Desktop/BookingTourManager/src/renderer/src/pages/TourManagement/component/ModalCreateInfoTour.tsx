import React, { useState } from 'react';
import {
    Button,
    Cascader,
    Checkbox,
    Col,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Rate,
    Row,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
    Modal, UploadFile
} from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const { TextArea } = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};


const ModalCreateInfo: React.FC = () => {
    const [showModalInfo, setShowModalInfo] = useState(true);
    const [editorContent, setEditorContent] = useState('');
    const [formValues, setFormValues] = useState({
        tenTour: '',
        loaiTour: 'mh',
        vungMien: 'mb',
        thoiGian: '1n',
        giaTour: '',
        soLuong: '',
        phuongTien: 'mb',
        chatLuongChoO: 'ks5',
        thanhPho: 'tp_ho_chi_minh',
        startDate: dayjs(),
        tanSuat: '2t1l',
        endDate: dayjs(),
        traiNghiem: '',
    });
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleUpload = (info: { file: UploadFile, fileList: UploadFile[] }) => {
        setFileList([info.file]);

        // Kiểm tra trạng thái của file
        if (info.file.status === 'uploading') {
            console.log('Uploading...');
        }
        if (info.file.status === 'done') {
            console.log('ok');
        } else if (info.file.status === 'error') {
            console.log('error');
        }
    };

    // Hàm cập nhật các giá trị form vào state
    const handleChange = (key: string, value: any) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [key]: value,
        }));
    };
    const handleSubmit = () => {
        const formData = { ...formValues };
        console.log(formData); // In ra formData khi submit
    };
    const handleToggle = () => {
        setShowModalInfo(!showModalInfo); // Chuyển đổi trạng thái khi nhấn nút
        console.log(formValues)
    };
    const loaiTours = [
        { value: 'mh', label: 'Mạo hiểm' },
        { value: 'tq', label: 'Tham quan' },
        { value: 'vh', label: 'Văn hóa' },
        { value: 'st', label: 'Sinh thái' },
        { value: 'nd', label: 'Nghỉ dưỡng' },
        { value: 'tb', label: 'Team building' },
    ]
    const vungMiens = [
        { value: 'mb', label: 'Miền Bắc' },
        { value: 'mtr', label: 'Miền Trung' },
        { value: 'mt', label: 'Miền Tây' },
        { value: 'mn', label: 'Miền Nam' },
    ]
    const thoiGians = [
        { value: '1n', label: 'Trong ngày' },
        { value: '2n1d', label: '2 ngày 1 đêm' },
        { value: '3n2d', label: '3 ngày 2 đêm' },
        { value: '4n3d', label: '4 ngày 3 đêm' },
    ]
    const phuongTiens = [
        { value: 'mb', label: 'Máy bay' },
        { value: 'bus', label: 'Xe buýt' },
        { value: 'oto', label: 'Ô tô' },
    ]
    const chatLuongChoOs = [
        { value: 'ks5', label: 'Khách sạn 5 sao' },
        { value: 'ks4', label: 'Khách sạn 4 sao' },
        { value: 'ks3', label: 'Khách sạn 3 sao' },
        { value: 'motel', label: 'Nhà nghỉ' },
    ]
    const thanhPhos = [
        { value: 'an_giang', label: 'An Giang' },
        { value: 'ba_ria_vung_tau', label: 'Bà Rịa - Vũng Tàu' },
        { value: 'bac_lieu', label: 'Bạc Liêu' },
        { value: 'bac_kan', label: 'Bắc Kạn' },
        { value: 'bac_giang', label: 'Bắc Giang' },
        { value: 'bac_ninh', label: 'Bắc Ninh' },
        { value: 'ben_tre', label: 'Bến Tre' },
        { value: 'binh_duong', label: 'Bình Dương' },
        { value: 'binh_dinh', label: 'Bình Định' },
        { value: 'binh_phuoc', label: 'Bình Phước' },
        { value: 'binh_thuan', label: 'Bình Thuận' },
        { value: 'ca_mau', label: 'Cà Mau' },
        { value: 'cao_bang', label: 'Cao Bằng' },
        { value: 'can_tho', label: 'Cần Thơ' },
        { value: 'da_nang', label: 'Đà Nẵng' },
        { value: 'dak_lak', label: 'Đắk Lắk' },
        { value: 'dak_nong', label: 'Đắk Nông' },
        { value: 'dien_bien', label: 'Điện Biên' },
        { value: 'dong_nai', label: 'Đồng Nai' },
        { value: 'dong_thap', label: 'Đồng Tháp' },
        { value: 'gia_lai', label: 'Gia Lai' },
        { value: 'ha_giang', label: 'Hà Giang' },
        { value: 'ha_nam', label: 'Hà Nam' },
        { value: 'ha_noi', label: 'Hà Nội' },
        { value: 'ha_tinh', label: 'Hà Tĩnh' },
        { value: 'hai_duong', label: 'Hải Dương' },
        { value: 'hai_phong', label: 'Hải Phòng' },
        { value: 'hau_giang', label: 'Hậu Giang' },
        { value: 'hoa_binh', label: 'Hòa Bình' },
        { value: 'hung_yen', label: 'Hưng Yên' },
        { value: 'khanh_hoa', label: 'Khánh Hòa' },
        { value: 'kien_giang', label: 'Kiên Giang' },
        { value: 'kon_tum', label: 'Kon Tum' },
        { value: 'lai_chau', label: 'Lai Châu' },
        { value: 'lam_dong', label: 'Lâm Đồng' },
        { value: 'lang_son', label: 'Lạng Sơn' },
        { value: 'lao_cai', label: 'Lào Cai' },
        { value: 'long_an', label: 'Long An' },
        { value: 'nam_dinh', label: 'Nam Định' },
        { value: 'nghe_an', label: 'Nghệ An' },
        { value: 'ninh_binh', label: 'Ninh Bình' },
        { value: 'ninh_thuan', label: 'Ninh Thuận' },
        { value: 'phu_tho', label: 'Phú Thọ' },
        { value: 'phu_yen', label: 'Phú Yên' },
        { value: 'quang_binh', label: 'Quảng Bình' },
        { value: 'quang_nam', label: 'Quảng Nam' },
        { value: 'quang_ngai', label: 'Quảng Ngãi' },
        { value: 'quang_ninh', label: 'Quảng Ninh' },
        { value: 'quang_tri', label: 'Quảng Trị' },
        { value: 'soc_trang', label: 'Sóc Trăng' },
        { value: 'son_la', label: 'Sơn La' },
        { value: 'tay_ninh', label: 'Tây Ninh' },
        { value: 'thai_binh', label: 'Thái Bình' },
        { value: 'thai_nguyen', label: 'Thái Nguyên' },
        { value: 'thanh_hoa', label: 'Thanh Hóa' },
        { value: 'thua_thien_hue', label: 'Thừa Thiên Huế' },
        { value: 'tien_giang', label: 'Tiền Giang' },
        { value: 'tp_ho_chi_minh', label: 'TP Hồ Chí Minh' },
        { value: 'tra_vinh', label: 'Trà Vinh' },
        { value: 'tuyen_quang', label: 'Tuyên Quang' },
        { value: 'vinh_long', label: 'Vĩnh Long' },
        { value: 'vinh_phuc', label: 'Vĩnh Phúc' },
        { value: 'yen_bai', label: 'Yên Bái' }
    ];
    const tanSuats = [
        { value: '1t1l', label: '1 tuần 1 lần' },
        { value: '2t1l', label: '2 tuần 1 lần' },
        { value: '3t1l', label: '3 tuần 1 lần' },
        { value: '4t1l', label: '1 tháng 1 lần' },

    ]

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const dateFormat = 'DD/MM/YYYY';
    const today: string = dayjs().format('DD/MM/YYYY');
    dayjs.extend(customParseFormat);
    const submit = () => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(editorContent, 'text/html');
        const textContent = doc.body.textContent || "";
        console.log("editorcontent html: ", editorContent)
        console.log("editorcontent text: ", textContent)
    };
    return (
        <div>
            {showModalInfo ? (
                <div className='overflow-y-scroll border border-spacing-1 max-h-[600px]   rounded-xl border-[#3fd0d4] p-4'>
                    <h2 className='font-bold text-xl mb-5 '>Tạo Tour</h2>
                    <Form
                        labelCol={{ span: 40 }}
                        layout="vertical"
                        wrapperCol={{ span: 24 }}
                        className='w-full'
                    >
                        <Row className='pr-6 justify-between'>
                            <Col span={14} >
                                <Form.Item label="Tên tour" className='custom-border' name="tenTour"
                                    rules={[{ required: true, },]} >
                                    <Input value={formValues.tenTour}
                                        onChange={(e) => handleChange('tenTour', e.target.value)} />
                                </Form.Item>
                                <Row className='justify-between'>
                                    <Form.Item label="Loại tour" name="loaiTour" style={{ width: '40%' }} className='custom-border'
                                        rules={[{ required: true, },]} >
                                        <Select
                                            value={formValues.loaiTour}
                                            defaultValue={formValues.loaiTour}
                                            onChange={(value) => handleChange('loaiTour', value)}
                                            options={loaiTours}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Vùng miền" name="vungMien" style={{ width: '40%' }} className='custom-border'
                                        rules={[{ required: true, },]} >
                                        <Select
                                            value={formValues.vungMien}
                                            defaultValue={formValues.vungMien}
                                            onChange={(value) => handleChange('vungMien', value)}
                                            options={vungMiens}
                                        />
                                    </Form.Item>
                                </Row>
                            </Col>
                            <Col span={8} >
                                <Form.Item label="Ảnh đại diện" className='font-bold '
                                    name="Files"
                                    rules={[
                                        {
                                            required: true,
                                            validator: (_, value) =>
                                                fileList.length > 0
                                                    ? Promise.resolve()
                                                    : Promise.reject(new Error('Vui lòng ảnh đại diện!')),
                                        },
                                    ]} >
                                    <Upload
                                        name="avatar"
                                        listType="picture"
                                        accept="image/*"
                                        onChange={handleUpload}
                                        fileList={fileList}
                                    >
                                        <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                                    </Upload>
                                </Form.Item>

                            </Col>
                        </Row>
                        <Row className='pr-6 justify-between'>
                            <Col span={14} >

                                <Row className='justify-between'>
                                    <Form.Item label="Thời gian" name="thoiGian" style={{ width: '40%' }} className='custom-border'
                                        rules={[{ required: true, },]} >
                                        <Select
                                            value={formValues.thoiGian}
                                            defaultValue={formValues.thoiGian}
                                            onChange={(value) => handleChange('thoiGian', value)}
                                            options={thoiGians}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Giá Tour" name="giaTour" style={{ width: '40%' }} className='custom-border'
                                        rules={[{ required: true, },]} >
                                        <Input value={formValues.giaTour}
                                            onChange={(e) => handleChange('giaTour', e.target.value)} />
                                    </Form.Item>
                                </Row>
                            </Col>
                            <Col span={8} >
                                <Form.Item label="Số lượng" name="soLuong" className='custom-border'
                                    rules={[{ required: true, },]} >
                                    <Input value={formValues.soLuong} type="number"
                                        onChange={(e) => handleChange('soLuong', e.target.value)} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row className='pr-6 justify-between'>
                            <Col span={14} >

                                <Row className='justify-between' >
                                    <Form.Item label="Phương tiện" name="phuongTien" style={{ width: '40%' }} className='custom-border'
                                        rules={[{ required: true, },]} >
                                        <Select
                                            value={formValues.phuongTien}
                                            defaultValue={formValues.phuongTien}
                                            onChange={(value) => handleChange('phuongTien', value)}
                                            options={phuongTiens}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Chất lượng chổ ở" name="chatLuongChoO" style={{ width: '40%' }} className='custom-border'
                                        rules={[{ required: true, },]} >
                                        <Select
                                            value={formValues.chatLuongChoO}
                                            defaultValue={formValues.chatLuongChoO}
                                            onChange={(value) => handleChange('chatLuongChoO', value)}
                                            options={chatLuongChoOs}
                                        />
                                    </Form.Item>
                                </Row>
                            </Col>
                            <Col span={8} >
                                <Form.Item label="Nơi bắt đầu" name="thanhPho" className='custom-border'
                                    rules={[{ required: true, },]} >
                                    <Select
                                        value={formValues.thanhPho}
                                        defaultValue={formValues.thanhPho}
                                        onChange={(value) => handleChange('thanhPho', value)}
                                        options={thanhPhos}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row className='pr-6 justify-between'>
                            <Col span={14} >

                                <Row className='justify-between'>
                                    <Form.Item label="Ngày bắt đầu" name="startDate" style={{ width: '40%' }} className='custom-border'
                                        rules={[{ required: true, },]} >
                                        <DatePicker value={formValues.startDate} defaultValue={formValues.startDate}
                                            onChange={(date) => handleChange('startDate', date)} format={dateFormat} />
                                    </Form.Item>
                                    <Form.Item label="Tần suất" name="tanSuat" style={{ width: '40%' }} className='custom-border'
                                        rules={[{ required: true, },]} >
                                        <Select
                                            value={formValues.tanSuat}
                                            defaultValue={formValues.tanSuat}
                                            onChange={(value) => handleChange('tanSuat', value)}
                                            options={tanSuats}
                                        />
                                    </Form.Item>
                                </Row>
                            </Col>
                            <Col span={8} >
                                <Form.Item label="Ngày kết thúc" name="endDate" className='custom-border'
                                    rules={[{ required: true, },]} >
                                    <DatePicker value={formValues.endDate} defaultValue={formValues.endDate}
                                        onChange={(date) => handleChange('endDate', date)} format={dateFormat} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="Trải nghiệm" name="traiNghiem" className='w-[97%] custom-border'
                            rules={[{ required: true, },]} >
                            <TextArea value={formValues.traiNghiem}
                                onChange={(e) => handleChange('traiNghiem', e.target.value)}
                                rows={4} />
                        </Form.Item>
                        <Row className='justify-end w-[97%]'>
                            <Button type="primary" className='pr-4 pl-4 p-2 bg-[#3fd0d4]' onClick={handleToggle} ><span className='font-bold text-white text-lg'>TIẾP TỤC</span></Button>
                        </Row>
                    </Form>
                </div>) : (<div className='border border-spacing-1  rounded-xl border-[#3fd0d4] p-4'>
                    <h2 className='font-bold text-xl mb-5 '>Chương trình tour</h2>
                    <Form
                        labelCol={{ span: 40 }}
                        layout="vertical"
                        wrapperCol={{ span: 24 }}
                        className='w-full'
                    >
                        <div >
                            <CKEditor

                                editor={ClassicEditor} data={editorContent}
                                onChange={(event, editor) => {
                                    const data = editor.getData();  // Lấy dữ liệu HTML
                                    setEditorContent(data);
                                }}

                            />
                        </div>
                        <Row className='justify-end w-[97%] m-4'>

                            <Button type="primary" className='pr-4 pl-4 p-2 mr-5 bg-[#3fd0d4]' onClick={handleToggle} ><span className='font-bold text-white text-lg'>QUAY LẠI</span></Button>
                            <Button type="primary" className='pr-4 pl-4 p-2 bg-[#3fd0d4]' onClick={submit} ><span className='font-bold text-white text-lg'>XÁC NHẬN</span></Button>
                        </Row>
                    </Form>
                </div>
            )
            }
        </div >
    );
};

export default ModalCreateInfo;
