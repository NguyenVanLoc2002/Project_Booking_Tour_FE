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


interface ModalProps {
    tourDetails: { id: number; name: string; day: number, night:number } ;
    onCancel: () => void;
}


const ModalCreateTicket: React.FC<ModalProps> = ({ tourDetails, onCancel }) => {
    const [showModalInfo, setShowModalInfo] = useState(true);
    const [editorContent, setEditorContent] = useState('');
    const [formValues, setFormValues] = useState({
        tourId: '',
        nameTour:'',
        startDate: dayjs(),
        endDate: dayjs(),
        availableSlot: 1
    });


    // Hàm cập nhật các giá trị form vào state
    const handleChange = (key: string, value: any) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [key]: value,
        }));
        console.log(tourDetails?.id);
    };
    const handleSubmit = () => {

    };
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const dateFormat = 'DD/MM/YYYY';
    const today: string = dayjs().format('DD/MM/YYYY');
    dayjs.extend(customParseFormat);
    const submit = () => {
        const formData = { ...formValues };
        console.log(formData); // In ra formData khi submit
    };
    return (
        <div>
            <div className='overflow-y-scroll border border-spacing-1 max-h-[550px]   rounded-xl border-[#3fd0d4] p-4'>
                <h2 className='font-bold text-xl mb-5 '>Đăng tour</h2>
                <Form
                    labelCol={{ span: 40 }}
                    layout="vertical"
                    wrapperCol={{ span: 24 }}
                    className='w-full'
                >
                    <Row className='pr-6 justify-between'>
                        <Col span={11} >
                            <Form.Item label="Tour Id" className='custom-border' name="tourId"  >
                                <Input defaultValue={tourDetails.id} disabled
                            />
                            </Form.Item>
                            <Form.Item label="Thời gian" className='custom-border' name="tourId"  >
                                <Input defaultValue={tourDetails.day + ' ngày ' + tourDetails.night + ' đêm' } disabled
                            />
                            </Form.Item>
                            <Form.Item label="Ngày bắt đầu" name="startDate" className='custom-border'
                                rules={[{ required: true, },]} >
                                <DatePicker value={formValues.startDate} defaultValue={formValues.startDate}
                                    onChange={(date) => handleChange('startDate', date)} format={dateFormat} />
                            </Form.Item>
                        </Col>
                        <Col span={11} >
                            <Form.Item label="Tên tour" className='custom-border' name="nameTour"  >
                                <Input defaultValue={tourDetails.name} disabled />
                            </Form.Item>
                            <Form.Item label="Số vé trống" className='custom-border' name="availableSlot "
                                rules={[{ required: true, },]} >
                                <Input value={formValues.availableSlot}
                                    onChange={(e) => handleChange('availableSlot', e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Ngày kết thúc" name="endDate" className='custom-border'
                                rules={[{ required: true, },]} >
                                <DatePicker value={formValues.endDate} defaultValue={formValues.endDate}
                                    onChange={(date) => handleChange('endDate', date)} format={dateFormat} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row className='justify-end w-[97%]'>
                        <Button type="primary" className='pr-4 pl-4 p-2 bg-[#bebebe] mr-4' onClick={onCancel} ><span className='font-bold text-white text-lg'>HỦY</span></Button>
                        <Button type="primary" className='pr-4 pl-4 p-2 bg-[#3fd0d4]' onClick={submit}><span className='font-bold text-white text-lg'>ĐĂNG TOUR</span></Button>
                    </Row>
                </Form>
            </div>

        </div >
    );
};

export default ModalCreateTicket;
