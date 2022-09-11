package com.laioffer.travelPlanner.controller;

import com.laioffer.travelPlanner.entity.DailyPlan;
import com.laioffer.travelPlanner.entity.TimeBlock;
import com.laioffer.travelPlanner.request.AddDailyPlanRequestBody;
import com.laioffer.travelPlanner.service.DailyPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class DailyPlanController {
    @Autowired
    private DailyPlanService dailyPlanService;

    /* ---------------- Current API (P0) -------------- */
    /**
     * 清除当前daily plan的所有place entry
     * 基于daily_plan_id
     */
    @RequestMapping(value = "/daily_plan/{daily_plan_id}/place_entry", method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.OK)
    public void clearDailyPlan(@PathVariable ("daily_plan_id") int dailyPlanId) {
        dailyPlanService.clearDailyPlan(dailyPlanId);
    }

    /**
     * 清除当前daily plan的某一time block中所有的place entry
     * 基于daily_plan_id和time_block
     */
    @RequestMapping(value = "/daily_plan/{daily_plan_id}/place_entry/{time_block}", method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.OK)
    public void clearDailyPlanByTimeBlock(@PathVariable ("daily_plan_id") int dailyPlanId, @PathVariable ("time_block") TimeBlock timeBlock) {
        dailyPlanService.clearDailyPlanByTimeBlock(dailyPlanId, timeBlock);
    }


    /* ---------------- Future API (P1+) -------------- */

    /**
     * 编辑当前trip选项
     * 此API为添加一个新的daily plan (涉及更改trip日期)
     */
    @RequestMapping(value = "/daily_plan", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addDailyPlan(@RequestBody AddDailyPlanRequestBody requestBody) {
        dailyPlanService.saveDailyPlan(requestBody.getTripId(), requestBody.getDate());
    }

    /**
     * 基于当前trip,单独查看某一daily plan
     * 此API为查看daily plan基于daily plan id
     */
    @RequestMapping(value = "/daily_plan/{daily_plan_id}", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public DailyPlan getDailyPlanById(@PathVariable ("daily_plan_id") int dailyPlanId) {
        return dailyPlanService.getDailyPlanById(dailyPlanId);
    }

    /**
     * 编辑当前trip选项
     * 此API为删除当前daily plan基于daily plan id
     * (涉及更改trip日期)
     */
    @RequestMapping(value = "/daily_plan/{daily_plan_id}", method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteDailyPlanById(@PathVariable("daily_plan_id") int dailyPlanId) {
        dailyPlanService.deleteDailyPlanById(dailyPlanId);
    }
}
