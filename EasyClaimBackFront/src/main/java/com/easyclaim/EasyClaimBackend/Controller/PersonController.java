package com.easyclaim.EasyClaimBackend.Controller;

import com.easyclaim.EasyClaimBackend.Entity.Person;
import com.easyclaim.EasyClaimBackend.Service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
public class PersonController {

    @Autowired
    private PersonService personService;

    @PostMapping("/people")
    public String createPerson(@RequestBody Person person) throws ExecutionException, InterruptedException {

        return personService.createPerson(person);

    }

    @GetMapping("/people/{id}")
    public Person getPerson(@PathVariable String id) throws ExecutionException, InterruptedException {

        return personService.getPerson(id);

    }

}
