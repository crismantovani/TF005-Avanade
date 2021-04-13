/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import FaceCapture from '../../components/FaceCapture/FaceCapture';
import Header from '../../components/Header/Header';

const PickOrder = () => {
  const [imgSrc, setImgSrc] = useState();

  const personGroupId = 'laboratoria';

  function handleFetchUrl(endpoint) {
    return `https://laboratoriarecog.cognitiveservices.azure.com/face/v1.0/${endpoint}`;
  }

  useEffect(() => {
    if (imgSrc) {
      fetch(handleFetchUrl(`persongroups/${personGroupId}/training`), {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.REACT_APP_AZURE_KEY1,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'succeeded') {
            fetch(imgSrc)
              .then((res) => res.blob())
              .then((blob) => {
                const file = new File([blob], 'Image', {
                  type: 'image/png',
                });
                fetch(handleFetchUrl('detect?returnFaceId=true'), {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/octet-stream',
                    'Ocp-Apim-Subscription-Key':
                      process.env.REACT_APP_AZURE_KEY1,
                  },
                  body: file,
                })
                  .then((response) => response.json())
                  .then((face) => {
                    const identifyBody = {
                      personGroupId: 'laboratoria',
                      faceIds: [face[0].faceId],
                      maxNumOfCandidatesReturned: 1,
                      confidenceThreshold: 0.5,
                    };
                    fetch(handleFetchUrl('identify'), {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Ocp-Apim-Subscription-Key':
                          process.env.REACT_APP_AZURE_KEY1,
                      },
                      body: JSON.stringify(identifyBody),
                    })
                      .then((response) => response.json())
                      .then((person) => {
                        fetch(
                          handleFetchUrl(
                            `persongroups/${personGroupId}/persons/${person[0].candidates[0].personId}`,
                          ),
                          {
                            headers: {
                              'Ocp-Apim-Subscription-Key':
                                process.env.REACT_APP_AZURE_KEY1,
                            },
                          },
                        )
                          .then((response) => response.json())
                          .then((personData) => console.log(personData.name));
                      });
                  });
              });
          }
        });
    }
  }, [imgSrc]);

  return (
    <>
      <Header/>
      <FaceCapture label="Pegar Encomenda" setImgSrc={setImgSrc} />
      <Button
        buttonText="Pegar pelo Código"
      />
    </>
  );
};

export default PickOrder;
