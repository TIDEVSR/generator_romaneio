import { useEffect, useRef, useState } from 'react';
import { formatarData } from '../../utils/formataData';
import image_molde from './img/image_molde_romaneio.png'
import { Api } from '../../services/api';

import * as PDFLib from 'pdf-lib'

import html2canvas from 'html2canvas';

import './style.css';

import JsBarcode from  'jsbarcode';
import { BarcodeGS1 } from './BarcodeGS1';

export const RomaneioCanvaObj = ({ cod_romaneio }) => {
    const divBarcode = useRef();

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

    const createBarcode = () => {
        if (!divBarcode.current) return;
        divBarcode.current.innerHTML = '';
        const svg = document.createElement('canvas');
        // item cliente + data_fabricao_validade + lote
        JsBarcode(svg, romaneio.cod_romaneio, {
            fontSize: 0,
            height: 35,
        });
        svg.classList.add('img-fluid');
        divBarcode.current.appendChild(svg);
    }

    const createIMG = async () => {
        // html2canvas(document.querySelector(`#romaneio_container_${cod_romaneio}`)).then(canvas => {
        //     canvas.classList.add(`canva_${cod_romaneio}`);
        //     document.querySelector(`#response-${cod_romaneio}`).appendChild(canvas);
        //     canva = canvas;
        //     document.querySelector(`#romaneio_container_${cod_romaneio}`).style.display = 'none'
        // });
        const canvas = await html2canvas(document.querySelector(`#romaneio_container_${cod_romaneio}`));

        canvas.classList.add(`canva_${cod_romaneio}`);
        document.querySelector(`#response-${cod_romaneio}`).appendChild(canvas);
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
                    <div id={`romaneio_container_${cod_romaneio}`} style={{position: 'relative', top: 0, left: 0, width: '1504.5px', maxWidth: '1504.5px', border: '1px solid #c2c2c216'}}>
                        {
                            romaneio && (
                                <>
                                    <img src={image_molde} alt="" />

                                    <div class="bloco romaneio">
                                        <span>{romaneio.cod_romaneio}</span>
                                    </div>

                                    <div class="bloco op_lote">
                                        <span>{Number(romaneio.cod_ordem)}/{romaneio.cod_lote}</span>
                                    </div>
                                    <div class="bloco barcode" ref={divBarcode}>
                                        <svg id="code_barras"></svg>
                                    </div>
                                    <div class="bloco cliente">
                                        <span>{romaneio.nome_cliente}</span>
                                    </div>
                                    <div class="bloco itemsr">
                                        <span>{romaneio.item_sr}</span>
                                    </div>
                                    <div class="bloco item_cliente">
                                        <span>{romaneio.item_cliente}</span>
                                    </div>

                                    <div class="bloco cidade">
                                        <span>{romaneio.nome_cidade}</span>
                                    </div>

                                    <div class="bloco peso_bruto">
                                        <span>{romaneio.peso_bruto}</span>
                                    </div>

                                    <div class="bloco peso_liquido">
                                        <span>{romaneio.peso_liquido}</span>
                                    </div>

                                    <div class="bloco peso_tubete">
                                        <span>{romaneio.peso_tubete}</span>
                                    </div>

                                    <div class="bloco quantidade">
                                        <span>{romaneio.peso_liquido} KG</span>
                                    </div>

                                    <div class="bloco endereco">
                                        <span>{romaneio.endereco}</span>
                                    </div>

                                    <div class="bloco qtd_vol">
                                        <span>{romaneio.qtd_volume}</span>
                                    </div>

                                    <div class="bloco data_prod">
                                        <span>{formatarData(romaneio.data_producao)}</span>
                                    </div>
                                    
                                    <div class="bloco op_lote2">
                                        <span>{Number(romaneio.cod_ordem)}/{romaneio.cod_lote}</span>
                                    </div>

                                    <BarcodeGS1 data={romaneio} />


                                    {
                                        romaneio && createBarcode()
                                    }
                                </>
                            )
                        }       
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" onClick={generatePDF}>Baixar</button>
                </div>
                </div>
            </div>
        )}
        </div>
    )
}