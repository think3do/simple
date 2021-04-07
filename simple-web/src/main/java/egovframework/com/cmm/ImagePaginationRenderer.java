package egovframework.com.cmm;

import egovframework.rte.ptl.mvc.tags.ui.pagination.AbstractPaginationRenderer;

import javax.servlet.ServletContext;

import org.springframework.web.context.ServletContextAware;
/**
 * ImagePaginationRenderer.java 클래스
 * 
 * @author 서준식
 * @since 2011. 9. 16.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    -------------    ----------------------
 *   2011. 9. 16.   서준식       이미지 경로에 ContextPath추가
 * </pre>
 */
public class ImagePaginationRenderer extends AbstractPaginationRenderer implements ServletContextAware{

	private ServletContext servletContext;
	
	public ImagePaginationRenderer() {
	
	}
	
//	public void initVariables(){
//		firstPageLabel    = "<li>&#160;</li><li><a href=\"?pageIndex={1}\" onclick=\"{0}({1});return false; \"><img src=\"" + servletContext.getContextPath() +  "/images/egovframework/com/cmm/mod/icon/icon_prevend.gif\" alt=\"처음\"   border=\"0\"/></a></li>";
//        previousPageLabel = "<li><a href=\"?pageIndex={1}\" onclick=\"{0}({1});return false; \"><img src=\"" + servletContext.getContextPath() +  "/images/egovframework/com/cmm/mod/icon/icon_prev.gif\"    alt=\"이전\"   border=\"0\"/></a></li>";
//        currentPageLabel  = "<li><strong>{0}</strong></li>";
//        otherPageLabel    = "<li><a href=\"?pageIndex={1}\" onclick=\"{0}({1});return false; \">{2}</a></li>";
//        nextPageLabel     = "<li>&#160;<a href=\"?pageIndex={1}\" onclick=\"{0}({1});return false; \"><img src=\"" + servletContext.getContextPath() +  "/images/egovframework/com/cmm/mod/icon/icon_next.gif\"    alt=\"다음\"   border=\"0\"/></a></li>";
//        lastPageLabel     = "<li><a href=\"?pageIndex={1}\" onclick=\"{0}({1});return false; \"><img src=\"" + servletContext.getContextPath() +  "/images/egovframework/com/cmm/mod/icon/icon_nextend.gif\" alt=\"마지막\" border=\"0\"/></a></li>";
//	}
	
	public void initVariables(){
//		firstPageLabel    = "[처음]";
//		previousPageLabel = "이전";
//		currentPageLabel  = "현재";
//		otherPageLabel    = "다른 페이지";
//		nextPageLabel     = "다음";
//		lastPageLabel     = "마지막";
		firstPageLabel    = "";
		previousPageLabel = "<li><a href=\"javascript:void(0)\" onclick=\"{0}({1});return false; \" aria-label=\"Pre\" ><span aria-hidden=\"true\"><i class=\"fa fa-chevron-left\"></i></span></a></li>";
		currentPageLabel  = "<li class=\"active\"><a href=\"javascript:void(0)\">{0}<span class=\"sr-only\">(current)</span></a></li>";
		otherPageLabel    = "<li><a href=\"javascript:void(0)\" onclick=\"{0}({1});return false; \">{2}</a></li>";
		nextPageLabel     = "<li><a href=\"javascript:void(0)\" onclick=\"{0}({1});return false; \" aria-label=\"Next\" ><span aria-hidden=\"true\"><i class=\"fa fa-chevron-right\"></i></span></a></li>";
		lastPageLabel     = "";
	}

	

	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
		initVariables();
	}

}
