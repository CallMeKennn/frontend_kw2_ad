import { Modal } from 'antd';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
     title: any;
     content: any;
     isOpenScriptModal: any;
     handleCloseScriptModal: any;
}

const ModalScript = ({ title, content, isOpenScriptModal, handleCloseScriptModal }: Props) => {
     return (
          <Modal open={isOpenScriptModal} onOk={handleCloseScriptModal} onCancel={handleCloseScriptModal}>
               <h1 className="text-3xl font-bold mb-4 text-center">{title}</h1>
               <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose max-w-none">
                    {content}
               </ReactMarkdown>
          </Modal>
     );
};

export default ModalScript;
