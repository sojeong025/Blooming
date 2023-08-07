package com.ssafy.backend.domain.reservation;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalTimeSerializer;
import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.user.User;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
public class Reservation {
    @Id
    @GeneratedValue
    @Column(name = "reservation_id")
    private Long id;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
//    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate reservedDate;
    @DateTimeFormat(pattern = "kk:mm")
    @JsonSerialize(using = LocalTimeSerializer.class)
    @JsonDeserialize(using = LocalTimeDeserializer.class)
    private LocalTime reservedTime;

    //연관: 회원 : 다대일 양방향!!
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    //연관: 상품 : 다대일 단방향(예약 -> 상품)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    public Reservation() {
    }

    //==양방향 세팅==//
    public void setUser(User user){
        this.user = user;
        user.getReservations().add(this); //맞낭
    }

    //==단방향 세팅?==//
    public void setProduct(Product product){
        this.product = product;
    }

    public Reservation(LocalDate reservedDate, LocalTime reservedTime) {
        this.reservedDate = reservedDate;
        this.reservedTime = reservedTime;
    }
}
