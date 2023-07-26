package com.ssafy.backend.domain.schedule;


import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findAllByScheduleDate(LocalDate scheduleDate);

}






//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Repository;
//
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//import java.time.LocalDate;
//import java.util.List;
//
//@Repository
//@RequiredArgsConstructor
//public class ScheduleRepository {
//
//    @PersistenceContext
//    private EntityManager em;
//
//    public List<Schedule> findByDate(int dayDiff){
//        //h2 쿼리..
//        List<Schedule> result = em.createQuery("select s from Schedule s where FORMATDATETIME(TIMESTAMPADD(DAY, :diff, NOW()), 'yyyy-MM-dd') " +
//                " = FORMATDATETIME(s.scheduleDateTime, 'yyyy-MM-dd')", Schedule.class)
//                .setParameter("diff", dayDiff)
//                .getResultList();
//        System.out.println(result);
//        return result;
//    }
//
//    public List getDate(){
//        //h2 쿼리..
//        List<Schedule> result = em.createQuery("select s from Schedule s where CURRENT_DATE " +
//                        " = FORMATDATETIME(s.scheduleDateTime, 'yyyy-MM-dd')", Schedule.class)
//                .getResultList();
//        System.out.println(result);
//        return result;
//    }
//
//}
