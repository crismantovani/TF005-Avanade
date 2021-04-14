/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useState } from 'react';
import FaceCapture from '../../components/FaceCapture/FaceCapture';
import Header from '../../components/Header/Header';
import client from '../../utils/APIconfig';
import Footer from '../../components/Footer/Footer';

const PickOrder = () => {
  const [loading, setLoading] = useState(false);
  const personGroupId = 'avanade';

  const detectFaces = (image) => {
    if (image) {
      fetch(image)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'Image', {
            type: 'image/png',
          });

          client.face.detectWithStream(file, {
            returnFaceId: true,
            recognitionModel: 'recognition_03',
          })
            .then((response) => {
              if (response.length === 0) {
                console.log('Sua Face ID não foi detectada, tente novamente! Certifique-se que sua face está desimpendida');
                setLoading(false);
              } else {
                const faceId = response[0].faceId;
                client.face.identify([faceId], {
                  personGroupId,
                  maxNumOfCandidatesReturned: 1,
                  confidenceThreshold: 0.5,
                })
                  .then((face) => {
                    if (!face[0].candidates.length) {
                      console.log('Sua Face ID não está cadastrada');
                      setLoading(false);
                    } else {
                      const personId = face[0].candidates[0].personId;
                      client.personGroupPerson.get(personGroupId, personId)
                        .then((person) => {
                          console.log(`Olá ${person.name}, ${person.userData} da Avanade`);
                          setLoading(false);
                        });
                    }
                  });
              }
            });
        });
    }
  };

  // function handleFetchUrl(endpoint) {
  //   return `https://laboratoriarecog.cognitiveservices.azure.com/face/v1.0/${endpoint}`;
  // }

  // useEffect(() => {
  // if (imgSrc) {
  //   fetch(handleFetchUrl(`persongroups/${personGroupId}/training`), {
  //     headers: {
  //       'Ocp-Apim-Subscription-Key': process.env.REACT_APP_AZURE_KEY1,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.status === 'succeeded') {
  //         fetch(imgSrc)
  //           .then((res) => res.blob())
  //           .then((blob) => {
  //             const file = new File([blob], 'Image', {
  //               type: 'image/png',
  //             });
  //             fetch(handleFetchUrl('detect?returnFaceId=true'), {
  //               method: 'POST',
  //               headers: {
  //                 'Content-Type': 'application/octet-stream',
  //                 'Ocp-Apim-Subscription-Key':
  //                   process.env.REACT_APP_AZURE_KEY1,
  //               },
  //               body: file,
  //             })
  //               .then((response) => response.json())
  //               .then((face) => {
  //                 const identifyBody = {
  //                   personGroupId: 'laboratoria',
  //                   faceIds: [face[0].faceId],
  //                   maxNumOfCandidatesReturned: 1,
  //                   confidenceThreshold: 0.5,
  //                 };
  //                 fetch(handleFetchUrl('identify'), {
  //                   method: 'POST',
  //                   headers: {
  //                     'Content-Type': 'application/json',
  //                     'Ocp-Apim-Subscription-Key':
  //                       process.env.REACT_APP_AZURE_KEY1,
  //                   },
  //                   body: JSON.stringify(identifyBody),
  //                 })
  //                   .then((response) => response.json())
  //                   .then((person) => {
  //                     fetch(
  //                       handleFetchUrl(
  //                         `persongroups/${personGroupId}/persons/${person[0].candidates[0].personId}`,
  //                       ),
  //                       {
  //                         headers: {
  //                           'Ocp-Apim-Subscription-Key':
  //                             process.env.REACT_APP_AZURE_KEY1,
  //                         },
  //                       },
  //                     )
  //                       .then((response) => response.json())
  //                       .then((personData) => console.log(personData.name));
  //                   });
  //               });
  //           });
  //       }
  //     });
  // }
  // }, [imgSrc, client.face]);

  return (
    <>
      <Header/>
      <FaceCapture
        label="Validar Acesso"
        loading={loading}
        setLoading={setLoading}
        detectFaces={detectFaces}
      />
      <Footer />
    </>
  );
};

export default PickOrder;
