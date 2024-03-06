import { useEffect, useRef, useState } from 'react';
import { formatarData } from '../../utils/formataData';
import image_molde from './img/image_molde_romaneio2.png'
import { Api } from '../../services/api';

import * as PDFLib from 'pdf-lib'

import html2canvas from 'html2canvas';

import { Romaneio } from '../Romaneio';

export const RomaneioCanvaObj = ({ cod_romaneio }) => {
    const [romaneio, setRomaneio] = useState(null);

    const findRomaneio = async () => {

        try {
            const resp = await Api.get(`/romaneio/?romaneio=${cod_romaneio}`);
            
            setRomaneio(resp.data);
        }
        catch(e) {
            setRomaneio(null);
        }
        finally {
        }
    }

    const createIMG = async () => {
        // html2canvas(document.querySelector(`#romaneio_container_${cod_romaneio}`)).then(canvas => {
        //     canvas.classList.add(`canva_${cod_romaneio}`);
        //     document.querySelector(`#response-${cod_romaneio}`).appendChild(canvas);
        //     canva = canvas;
        //     document.querySelector(`#romaneio_container_${cod_romaneio}`).style.display = 'none'
        // });
        document.querySelector(`#romaneio_container_${cod_romaneio}`).style.display = 'block'
        document.querySelector(`#response-${cod_romaneio}`).innerHTML = '';
        

        const canvas = await html2canvas(document.querySelector(`#romaneio_container_${cod_romaneio}`));
        const img = document.createElement('img');
    
        img.classList.add('img-fluid');
        img.src = canvas.toDataURL();

        canvas.classList.add(`canva_${cod_romaneio}`);
        canvas.classList.add(`d-none`);
        document.querySelector(`#response-${cod_romaneio}`).appendChild(canvas);
        document.querySelector(`#response-${cod_romaneio}`).appendChild(img);
        document.querySelector(`#romaneio_container_${cod_romaneio}`).style.display = 'none'

        return canvas;
    }

    const generatePDF = async () => {
        await createIMG();
        
        let canvas = document.querySelector(`.canva_${cod_romaneio}`);

        // Captura o conteúdo do canvas como uma imagem base64
        const imageData = canvas.toDataURL('image/jpeg');

        // Cria um novo documento PDF
        const pdfDoc = await PDFLib.PDFDocument.create();
        const page = pdfDoc.addPage([canvas.width, canvas.height]);
        const { width, height } = page.getSize();

        // Adiciona a imagem do canvas ao PDF
        const jpgImage = await pdfDoc.embedJpg(imageData);
        page.drawImage(jpgImage, {
            x: 0,
            y: 0,
            width,
            height,
        });

        // Salva o PDF em um blob
        const pdfBytes = await pdfDoc.save();

        // Converte os bytes do PDF para um objeto Blob
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

        // Cria um link para download do PDF
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(pdfBlob);
        downloadLink.download = `romaneio_${cod_romaneio}.pdf`;

        // Adiciona o link ao corpo da página e clica automaticamente para iniciar o download
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Remove o link após o download
        document.body.removeChild(downloadLink);
    }

    useEffect(() => {
        findRomaneio();
    }, []);

    return (
        <div class="modal fade" id={`staticBackdrop${cod_romaneio}`} data-bs-keyboard="true" tabindex="-1" aria-labelledby={`staticBackdropLabel${cod_romaneio}`} aria-hidden="true">
        {romaneio && (
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id={`staticBackdropLabel${cod_romaneio}`}>Romaneio de Pallet - {cod_romaneio}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id={`response-${cod_romaneio}`}></div>                    
                    <Romaneio romaneio={romaneio} image_molde={image_molde} />                        
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" style={{ marginRight: '1%' }}>Fechar</button>
                    <button type="button" class="btn btn-primary" onClick={generatePDF} style={{ marginRight: '3%' }}>Baixar</button>
                </div>
                </div>
            </div>
        )}
        </div>
    )
}