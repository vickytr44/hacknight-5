package com.devils.backend.devilsapi;

import com.microsoft.cognitiveservices.speech.samples.console.TranslationSamples;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Stream;

@RestController
public class GreetingController {
    @RequestMapping("/greeting")
    public String greeting() {
        return "Hello world from greeting....ping pong";
    }

    @RequestMapping(value="/uploadAudio")
    public String uploadAudio() {
        try {
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

    @RequestMapping(value="/get-text")
    public String uploadTextToModel() {

        StringBuilder contentBuilder = new StringBuilder();

        try (Stream<String> stream = Files.lines( Paths.get("speech-to-text.txt"), StandardCharsets.UTF_8))
        {
            stream.forEach(s -> contentBuilder.append(s).append(" "));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return contentBuilder.toString();
    }
}