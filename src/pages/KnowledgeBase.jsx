
import { useState } from "react";
import {
  BookOpen,
  FileText,
  Eye,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import "./KnowledgeBase.css";

function KnowledgeBase() {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "How to Reset Your Password",
      category: "Account",
      status: "Published",
      views: 1250,
      updated: "Nov 08, 2026",
      content:
        "To reset your password, open the login page and click Forgot Password. Enter your registered email address and follow the instructions sent to your inbox.",
    },
    {
      id: 2,
      title: "How to Track Your Order",
      category: "Orders",
      status: "Published",
      views: 980,
      updated: "Nov 07, 2026",
      content:
        "You can track your order by opening your account, selecting My Orders, and clicking the Track Order button beside your purchase.",
    },
    {
      id: 3,
      title: "Understanding Payment Methods",
      category: "Payments",
      status: "Published",
      views: 745,
      updated: "Nov 05, 2026",
      content:
        "Our platform supports multiple payment methods. Select your preferred payment option during checkout and follow the instructions to complete your transaction.",
    },
    {
      id: 4,
      title: "How to Request a Refund",
      category: "Refunds",
      status: "Draft",
      views: 0,
      updated: "Nov 04, 2026",
      content:
        "To request a refund, contact our customer support team and provide your order number and reason for the request.",
    },
    {
      id: 5,
      title: "Managing Your Account Information",
      category: "Account",
      status: "Published",
      views: 620,
      updated: "Nov 02, 2026",
      content:
        "Visit your account settings to update your name, contact information, and other profile details.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    title: "",
    category: "Account",
    content: "",
    status: "Draft",
  };

  const [formData, setFormData] = useState(emptyForm);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || article.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" || article.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const publishedCount = articles.filter(
    (article) => article.status === "Published"
  ).length;

  const totalViews = articles.reduce(
    (total, article) => total + article.views,
    0
  );

  const openCreateForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (article) => {
    setEditingId(article.id);
    setFormData({
      title: article.title,
      category: article.category,
      content: article.content,
      status: article.status,
    });
    setShowForm(true);
    setSelectedArticle(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }

    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    if (editingId) {
      setArticles((prev) =>
        prev.map((article) =>
          article.id === editingId
            ? { ...article, ...formData, updated: today }
            : article
        )
      );
    } else {
      const newArticle = {
        id: Date.now(),
        ...formData,
        views: 0,
        updated: today,
      };

      setArticles((prev) => [newArticle, ...prev]);
    }

    setShowForm(false);
    setFormData(emptyForm);
    setEditingId(null);
  };

  const deleteArticle = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (!confirmed) return;

    setArticles((prev) => prev.filter((article) => article.id !== id));
    setSelectedArticle(null);
  };

  const viewArticle = (article) => {
    setSelectedArticle(article);

    if (article.status === "Published") {
      setArticles((prev) =>
        prev.map((item) =>
          item.id === article.id
            ? { ...item, views: item.views + 1 }
            : item
        )
      );
    }
  };

  return (
    <div className="knowledge-page">
      <div className="knowledge-heading">
        <div>
          <h2>Knowledge Base</h2>
          <p>Create and manage helpful articles for your support team.</p>
        </div>

        <button className="knowledge-add-btn" onClick={openCreateForm}>
          <Plus size={18} />
          Add Article
        </button>
      </div>

      <div className="knowledge-stats">
        <div className="knowledge-stat-card">
          <div className="knowledge-stat-icon blue">
            <BookOpen size={22} />
          </div>
          <div>
            <p>Total Articles</p>
            <h3>{articles.length}</h3>
          </div>
        </div>

        <div className="knowledge-stat-card">
          <div className="knowledge-stat-icon green">
            <FileText size={22} />
          </div>
          <div>
            <p>Published Articles</p>
            <h3>{publishedCount}</h3>
          </div>
        </div>

        <div className="knowledge-stat-card">
          <div className="knowledge-stat-icon purple">
            <Eye size={22} />
          </div>
          <div>
            <p>Total Article Views</p>
            <h3>{totalViews.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="knowledge-panel">
        <div className="knowledge-panel-heading">
          <div>
            <h3>Article Library</h3>
            <p>Browse and manage your support articles.</p>
          </div>
        </div>

        <div className="knowledge-toolbar">
          <div className="knowledge-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Account">Account</option>
            <option value="Orders">Orders</option>
            <option value="Payments">Payments</option>
            <option value="Refunds">Refunds</option>
            <option value="Shipping">Shipping</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        <div className="knowledge-articles">
          {filteredArticles.map((article) => (
            <div className="knowledge-article" key={article.id}>
              <div className="knowledge-article-icon">
                <FileText size={22} />
              </div>

              <div className="knowledge-article-info">
                <h4>{article.title}</h4>
                <p>{article.content}</p>

                <div className="knowledge-article-meta">
                  <span>{article.category}</span>
                  <span>{article.updated}</span>
                  <span>
                    <Eye size={13} />
                    {article.views.toLocaleString()} views
                  </span>
                </div>
              </div>

              <div className="knowledge-article-actions">
                <span
                  className={`knowledge-status ${article.status.toLowerCase()}`}
                >
                  {article.status}
                </span>

                <button
                  title="View article"
                  onClick={() => viewArticle(article)}
                >
                  <Eye size={17} />
                </button>

                <button
                  title="Edit article"
                  onClick={() => openEditForm(article)}
                >
                  <Pencil size={17} />
                </button>

                <button
                  title="Delete article"
                  className="knowledge-delete"
                  onClick={() => deleteArticle(article.id)}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))}

          {filteredArticles.length === 0 && (
            <div className="knowledge-empty">
              <BookOpen size={30} />
              <p>No articles found.</p>
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="knowledge-modal-overlay">
          <div className="knowledge-modal">
            <div className="knowledge-modal-heading">
              <div>
                <h3>{editingId ? "Edit Article" : "Create Article"}</h3>
                <p>Enter the article information below.</p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="knowledge-close-btn"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>Article Title</label>
              <input
                type="text"
                placeholder="Enter article title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />

              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="Account">Account</option>
                <option value="Orders">Orders</option>
                <option value="Payments">Payments</option>
                <option value="Refunds">Refunds</option>
                <option value="Shipping">Shipping</option>
              </select>

              <label>Article Content</label>
              <textarea
                rows="6"
                placeholder="Write your article content..."
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                required
              />

              <label>Publication Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>

              <div className="knowledge-form-actions">
                <button
                  type="button"
                  className="knowledge-cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="knowledge-save-btn">
                  {editingId ? "Save Changes" : "Create Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedArticle && (
        <div className="knowledge-modal-overlay">
          <div className="knowledge-modal">
            <div className="knowledge-modal-heading">
              <div>
                <h3>Article Details</h3>
                <p>{selectedArticle.category}</p>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="knowledge-close-btn"
              >
                <X size={20} />
              </button>
            </div>

            <div className="knowledge-detail-content">
              <span
                className={`knowledge-status ${selectedArticle.status.toLowerCase()}`}
              >
                {selectedArticle.status}
              </span>

              <h2>{selectedArticle.title}</h2>
              <p>{selectedArticle.content}</p>

              <small>Last updated: {selectedArticle.updated}</small>
            </div>

            <div className="knowledge-form-actions">
              <button
                className="knowledge-cancel-btn"
                onClick={() => setSelectedArticle(null)}
              >
                Close
              </button>

              <button
                className="knowledge-save-btn"
                onClick={() => openEditForm(selectedArticle)}
              >
                <Pencil size={15} />
                Edit Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default KnowledgeBase;
