package com.becky.myapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.becky.myapp.domain.Item;

import java.util.List;

@RestController
public class ItemController {
    JdbcTemplate jdbcTemplate;

    @Autowired
    ItemController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @RequestMapping(value = "/items", method = RequestMethod.GET)
    public List<Item> getItems() {
            return jdbcTemplate.query("SELECT * FROM \"ToDoTable\"", (row, idx) -> new Item(
                    row.getLong("id"),
                    row.getString("value")
            ));
    }

    @RequestMapping(value="/items", method = RequestMethod.POST)
    public String createItem(@RequestBody Item item) {
        jdbcTemplate.update("INSERT INTO \"ToDoTable\" (id, value) VALUES(nextval('ToDoSequence'), ?)",
                new Object[]{ item.getValue() });
        return "INSERTED";
    }
}
