package com.bee.controller;

import com.bee.common.PaginatedResult;
import com.bee.common.Result;
import com.bee.controller.dto.ItemListReqVo;
import com.bee.domain.User;
import com.bee.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * created by guos on 2018/11/4
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Resource
    UserRepository userRepository;


    @PostMapping("/list")
    public Result<List<User>> list(@RequestBody ItemListReqVo itemListReqVo) {
        int pageNum = itemListReqVo.getPageNum() >= 1 ? itemListReqVo.getPageNum() - 1 : 0;
        int pageSize = itemListReqVo.getPageSize();
        Page<User> gradePage = userRepository.findAll(PageRequest.of(pageNum, pageSize));
        return PaginatedResult.successfulResponse(gradePage.getContent(), gradePage.getTotalElements(), pageSize);
    }
}
