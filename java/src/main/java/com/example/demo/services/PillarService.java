package com.example.demo.services;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.lang.GeoLocation;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.GpsDirectory;
import com.example.demo.model.Image;
import com.example.demo.model.Pillar;
import com.example.demo.repository.ImageRepository;
import com.example.demo.repository.PillarRepository;
import com.ibm.cloud.sdk.core.security.IamAuthenticator;
import com.ibm.watson.visual_recognition.v3.VisualRecognition;
import com.ibm.watson.visual_recognition.v3.model.ClassifiedImages;
import com.ibm.watson.visual_recognition.v3.model.ClassifyOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.net.URL;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PillarService {

  public static class PhotoLocation
  {
    public final GeoLocation location;

    public PhotoLocation(final GeoLocation location)
    {
      this.location = location;
    }
  }

    private PhotoLocation photoLocation;

    @Autowired
    private PillarRepository pillarRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ImageService imageService;

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

  private double distance(double lat1, double lon1, double lat2, double lon2, char unit) {
    double theta = lon1 - lon2;
    double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
    dist = Math.acos(dist);
    dist = rad2deg(dist);
    dist = dist * 60 * 1.1515;
    if (unit == 'K') {
      dist = dist * 1.609344;
    } else if (unit == 'N') {
      dist = dist * 0.8684;
    }
    return (dist);
  }

  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
  /*::  This function converts decimal degrees to radians             :*/
  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
  private double deg2rad(double deg) {
    return (deg * Math.PI / 180.0);
  }

  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
  /*::  This function converts radians to decimal degrees             :*/
  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
  private double rad2deg(double rad) {
    return (rad * 180.0 / Math.PI);
  }

  public void analyzePillar(Map<String,String> img_url) {

    IamAuthenticator authenticator = new IamAuthenticator("L2MM30I-6bzosYbrTMFeFXofHrpH--nWUN5KCrLZ8Uab");
    VisualRecognition visualRecognition = new VisualRecognition("2018-03-19", authenticator);
    visualRecognition.setServiceUrl("https://gateway-seo.watsonplatform.net/visual-recognition/api");

    InputStream imagesStream = null;
    ClassifiedImages result = null;

    try {
      imagesStream = new URL(img_url.get("image_url")).openStream();
      ClassifyOptions classifyOptions = new ClassifyOptions.Builder()
        .imagesFilename("images")
        .imagesFile(imagesStream)
        .classifierIds(Arrays.asList("stlpyHackathon_980490904"))
        .build();
      result = visualRecognition.classify(classifyOptions).execute().getResult();

      imagesStream = new URL(img_url.get("image_url")).openStream();
      Metadata metadata = ImageMetadataReader.readMetadata(imagesStream);
      // See whether it has GPS data
      Collection<GpsDirectory> gpsDirectories = metadata.getDirectoriesOfType(GpsDirectory.class);
      for (GpsDirectory gpsDirectory : gpsDirectories) {
        // Try to read out the location, making sure it's non-zero
        GeoLocation geoLocation = gpsDirectory.getGeoLocation();
        if (geoLocation != null && !geoLocation.isZero()) {
          // Add to our collection for use below
          this.photoLocation = new PhotoLocation(geoLocation);
          System.out.println(this.photoLocation);
          break;
        }
      }
    } catch (IOException e) {
      e.printStackTrace();
    } catch (ImageProcessingException e) {
      e.printStackTrace();
    }

    if (this.photoLocation != null && result != null && result.getImages().get(0).getClassifiers().get(0).getClasses().size() != 0) {


      List<Pillar> pillars = getAll();
      final Pillar[] closestPillar = {new Pillar()};
      final double[] closestDistance = {100};
      final double[] diff = new double[1];
      Image image = imageRepository.findByDownloadUrlContains(img_url.get("image_url"));

      pillars.forEach(pillar -> {
        diff[0] = distance(pillar.getCoordinates()[0].doubleValue(), pillar.getCoordinates()[1].doubleValue(), this.photoLocation.location.getLatitude(), this.photoLocation.location.getLongitude(), 'K');
        if (diff[0] < closestDistance[0]) {
          closestDistance[0] = diff[0];
          closestPillar[0] = pillar;
        }
      });

      image.setLng(BigDecimal.valueOf(this.photoLocation.location.getLongitude()));
      image.setLat(BigDecimal.valueOf(this.photoLocation.location.getLatitude()));
      if (result.getImages().get(0).getClassifiers().get(0).getClasses().get(0).getXClass().contains("Poskodene")){
        image.setCorrupted(true);
      } else {
        image.setCorrupted(false);
      }

      imageService.updateImage(image,image.getId());


      if (closestDistance[0] < 100) {
        closestPillar[0].setImages(new String[]{image.getDownloadUrl()});

        updatePillar(closestPillar[0], closestPillar[0].getId());
      } else {
        BigDecimal[] bigDecimals = new BigDecimal[0];
        bigDecimals[0] = BigDecimal.valueOf(this.photoLocation.location.getLatitude());
        bigDecimals[1] = BigDecimal.valueOf(this.photoLocation.location.getLongitude());
        createPillar(new Pillar(bigDecimals, new String[]{image.getDownloadUrl()}));
      }
    }
  }
  }




