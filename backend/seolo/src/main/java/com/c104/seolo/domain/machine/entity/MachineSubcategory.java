package com.c104.seolo.domain.machine.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@ToString
@Entity
@Table(name = "machine_subcategory")
public class MachineSubcategory {
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "machine_subcategory_id", nullable = false)
    @Id
    private Long id;

    @Column(name = "machine_subcategory", length = 40, nullable = false)
    private String subcategory;

    @Builder
    private MachineSubcategory(Long id, String subcategory) {
        this.id = id;
        this.subcategory = subcategory;
    }

    public MachineSubcategory() {

    }
}
