package com.example.demo.services;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Metadata;
import com.example.demo.model.Pillar;
import com.example.demo.repository.PillarRepository;
import com.ibm.cloud.sdk.core.security.IamAuthenticator;
import com.ibm.watson.visual_recognition.v3.VisualRecognition;
import com.ibm.watson.visual_recognition.v3.model.ClassifiedImages;
import com.ibm.watson.visual_recognition.v3.model.ClassifyOptions;
import com.sun.jndi.toolkit.url.Uri;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PillarService {

    @Autowired
    private PillarRepository pillarRepository;

    public List<Pillar> getAll() {
        return pillarRepository.findAll();
    }

    public Pillar createPillar(Pillar pillar) {
        return pillarRepository.save(pillar);
    }

    public List<Pillar> createPillars(List<Pillar> pillars) {
        return pillars.stream().map(pillar -> pillarRepository.save(pillar)).collect(Collectors.toList());
    }

  public Pillar updatePillar(Pillar pillar, Long pillarId) {
    return pillarRepository.findById(pillarId)
      .map(image1 -> {
        image1.setCoordinates(pillar.getCoordinates());
        image1.setEntityHandle(pillar.getEntityHandle());
        image1.setImages(pillar.getImages());
        return pillarRepository.save(image1);
      })
      .orElseGet(() -> {
        return pillarRepository.save(pillar);
      });
  }

  public void analyzePillar(Map<String,String> img_url) {
    IamAuthenticator authenticator = new IamAuthenticator("L2MM30I-6bzosYbrTMFeFXofHrpH--nWUN5KCrLZ8Uab");
    VisualRecognition visualRecognition = new VisualRecognition("2019-02-21", authenticator);
    visualRecognition.setServiceUrl("https://gateway-seo.watsonplatform.net/visual-recognition/api");
    try {
      URL url = new URL(img_url.get("img_url"));
      URLConnection connection = url.openConnection();
      InputStream in = connection.getInputStream();
      ClassifyOptions classifyOptions = new ClassifyOptions.Builder()
        .imagesFile(in)
        .classifierIds(Collections.singletonList("stlpyHackathon_980490904"))
        .build();
      ClassifiedImages result = visualRecognition.classify(classifyOptions).execute().getResult();
      System.out.println(result);
    } catch (IOException e) {
      e.printStackTrace();
    }

//
//    try {
//      Metadata metadata = ImageMetadataReader.readMetadata(imagesStream);
//      System.out.println("Metadata" + metadata.getDirectories());
//    } catch (ImageProcessingException e) {
//      e.printStackTrace();
//    } catch (IOException e) {
//      e.printStackTrace();
//    }
  }
}
