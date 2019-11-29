package com.example.demo.controller;

import com.example.demo.model.Image;
import com.example.demo.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ImageRestController {

  @Autowired
  private ImageService imageService;

  @PostMapping("/image")
  public Image createImage(@RequestBody Image image) {
    return imageService.createImage(image);
  }

  @GetMapping("/image")
  public List<Image> getAllImages() {
    return imageService.getAllImages();
  }

  @PutMapping("/image/imageId")
  public Image updateImage(@PathVariable Long imageId, @RequestBody Image image) {
    return imageService.updateImage(image,imageId);
  }
}
