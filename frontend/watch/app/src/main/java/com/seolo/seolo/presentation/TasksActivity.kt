package com.seolo.seolo.presentation

import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import androidx.viewpager2.widget.ViewPager2
import com.seolo.seolo.R
import com.seolo.seolo.adapters.CarouselStateAdapter
import com.seolo.seolo.fragments.TaskLastFragment
import com.seolo.seolo.fragments.TasksFragment
import com.seolo.seolo.model.TaskItem

class TasksActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 액션바 숨기기
        supportActionBar?.hide()

        // XML 레이아웃 설정
        setContentView(R.layout.activity_layout)

        val viewPager: ViewPager2 = findViewById(R.id.viewPager)
        val adapter = CarouselStateAdapter(this)

        // Tasks 리스트 받기
        val tasks = intent.getParcelableArrayListExtra<TaskItem>("tasks")
        Log.d("WorkActivity", "tasks: $tasks")

        tasks?.let {
            for ((index, task) in it.withIndex()) {
                if (index == it.size - 1) {
                    // 마지막 작업 프래그먼트 추가
                    val lastFragment = TaskLastFragment.newInstance(
                        getDrawableId(task.taskTemplateName),
                        task.taskTemplateId,
                        task.taskTemplateName,
                        task.taskPrecaution
                    )
                    adapter.addFragment(lastFragment)
                } else {
                    // 일반 작업 프래그먼트 추가
                    val fragment = TasksFragment.newInstance(
                        getDrawableId(task.taskTemplateName),
                        task.taskTemplateId,
                        task.taskTemplateName,
                        task.taskPrecaution
                    )
                    adapter.addFragment(fragment)
                }
            }
        }

        viewPager.adapter = adapter

        // 페이지 변경 리스너 등록
        viewPager.registerOnPageChangeCallback(object : ViewPager2.OnPageChangeCallback() {
            override fun onPageSelected(position: Int) {
                super.onPageSelected(position)
                updateArrows(position)
            }
        })
    }

    // 화살표 업데이트
    private fun updateArrows(position: Int) {
        val leftArrow: ImageView = findViewById(R.id.slideLeftIcon)
        leftArrow.visibility = if (position == 0) View.INVISIBLE else View.VISIBLE
    }

    // 작업 이름에 따른 드로어블 리소스 ID 반환
    private fun getDrawableId(taskName: String): Int {
        return when (taskName) {
            "정비" -> R.drawable.img_maintenance
            "청소" -> R.drawable.img_clean
            "수리" -> R.drawable.img_repair
            else -> R.drawable.img_etc
        }
    }
}
