package com.controller;

import com.microsoft.cognitiveservices.speech.samples.console.TranslationSamples;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

@Controller
@RequestMapping("/rest")
public class RestApiController {

    @RequestMapping(value="/uploadAudio", method=RequestMethod.GET)
    public String uploadAudio() {
        try {
            System.out.println("Inside try ... \n");
            TranslationSamples.translationWithFileAsync();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "Done";
    }

    @RequestMapping(value="/readersBooks", method=RequestMethod.GET)
    public String readersBooks(){
        return "readingList";
    }

}
