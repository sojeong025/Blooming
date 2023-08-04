package com.ssafy.backend.domain.liked;

import com.ssafy.backend.domain.common.CreatedBaseEntity;
import com.ssafy.backend.domain.review.Review;
import com.ssafy.backend.domain.user.User;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Liked  extends CreatedBaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "LIKED_ID")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="USER_ID")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="REVIEW_ID")
    private Review review;

    public  Liked(User user, Review review){
        this.user = user;
        this.review = review;
    }

}
